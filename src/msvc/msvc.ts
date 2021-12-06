import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { error } from "@actions/core"
import { setupVCVarsall } from "../vcvarsall/vcvarsall"
import { readFileSync } from "fs"

type MSVCVersion = "2015" | "2017" | "2019" | string

export async function setupMSVC(
  version: MSVCVersion,
  _setupDir: string,
  arch: string,
  sdk?: string,
  uwp?: boolean,
  spectre?: boolean
): Promise<void> {
  if (process.platform !== "win32") {
    return
  }
  let toolset: string | undefined
  let VCTargetsPath: string | undefined
  // TODO enable this code path once its bugs are fixed
  // https://github.com/aminya/setup-cpp/issues/1
  try {
    if (version === "2015") {
      toolset = "14.0"
      await setupChocoPack("visualcpp-build-tools", "14.0.25420.1", ["--ignore-dependencies"])
      VCTargetsPath = "C:/Program Files (x86)/MSBuild/Microsoft.Cpp/v4.0/v140"
    } else if (version === "2017") {
      toolset = "14.16"
      await setupChocoPack("visualstudio2017buildtools", "15.9.41.0", [])
      VCTargetsPath = "C:/Program Files (x86)/Microsoft Visual Studio/2017/BuildTools/VC/Tools/MSVC/14.16" // TODO verify path
    } else if (version === "2019") {
      toolset = "14.29"
      await setupChocoPack("visualstudio2019buildtools", "16.11.7.0", [])
      VCTargetsPath = "C:/Program Files (x86)/Microsoft Visual Studio/2019/BuildTools/VC/Tools/MSVC/14.29.30133"
    }
  } catch (e) {
    error(e as string | Error)
    const choco_logs = readFileSync(`${process.env.ALLUSERSPROFILE}\\chocolatey\\logs\\chocolatey.log`, "utf8")
    console.log(choco_logs)
  }
  // run vcvarsall.bat environment variables
  setupVCVarsall(VCTargetsPath, arch, toolset, sdk, uwp, spectre)
}
