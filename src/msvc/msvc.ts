import path from "path"
import { fileURLToPath } from "url"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GITHUB_ACTIONS } from "ci-info"
import { error, info, warning } from "ci-log"
import { findVcvarsall, vsversion_to_versionnumber } from "msvc-dev-cmd/lib.js"
import { pathExists } from "path-exists"
import { join } from "patha"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupVCVarsall } from "../vcvarsall/vcvarsall.js"

const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

type MSVCVersion = "2022" | "17.0" | "2019" | "16.0" | "2017" | "15.0" | "2015" | "14.0" | "2013" | "12.0" | string

export async function setupMSVC(
  versionGiven: MSVCVersion,
  _setupDir: string,
  arch: string,
  sdk?: string,
  uwp?: boolean,
  spectre?: boolean,
) {
  if (process.platform !== "win32") {
    return
  }
  const version = vsversion_to_versionnumber(versionGiven) as string

  // check if the given version is already installed
  info(`Checking if MSVC ${version} is already installed`)
  let installed = false
  try {
    const vcvarsall_path = findVcvarsall(version) as string
    installed = true
    info(`Found the pre-installed version of MSVC at ${vcvarsall_path}`)
  } catch {
    // not installed, try installing
  }

  let toolset: string | undefined
  let VCTargetsPath: string | undefined
  // https://github.com/aminya/setup-cpp/issues/1
  if (!installed) {
    try {
      if (version === "14.0") {
        toolset = "14.0"
        await setupChocoPack("visualcpp-build-tools", "14.0.25420.1", ["--ignore-dependencies"])
        VCTargetsPath = "C:/Program Files (x86)/MSBuild/Microsoft.Cpp/v4.0/v140"
      } else if (version === "15.0") {
        toolset = "14.16"
        await setupChocoPack("visualstudio2017buildtools", "15.9.41.0", [])
        VCTargetsPath = "C:/Program Files (x86)/Microsoft Visual Studio/2017/BuildTools/VC/Tools/MSVC/14.16" // TODO verify path
      } else if (version === "16.0") {
        toolset = "14.29"
        await setupChocoPack("visualstudio2019buildtools", "16.11.7.0", [])
        VCTargetsPath = "C:/Program Files (x86)/Microsoft Visual Studio/2019/BuildTools/VC/Tools/MSVC/14.29.30133"
      } else if (version === "17.0") {
        toolset = undefined
        await setupChocoPack("visualstudio2022buildtools", "117.0.5.0", [])
        VCTargetsPath = undefined
      } else {
        error(`The given MSVC versions ${versionGiven} is not supported yet.`)
      }
    } catch (e) {
      error(e as string | Error)
    }
  }
  // run vcvarsall.bat environment variables
  await setupVCVarsall(version, VCTargetsPath, arch, toolset, sdk, uwp, spectre)

  if (GITHUB_ACTIONS) {
    await addMSVCLoggingMatcher()
  }
}

async function addMSVCLoggingMatcher() {
  const matcherPath = join(dirname, "msvc_matcher.json")
  if (!(await pathExists(matcherPath))) {
    return warning("the msvc_matcher.json file does not exist in the same folder as setup-cpp.js")
  }
  info(`::add-matcher::${matcherPath}`)
}
