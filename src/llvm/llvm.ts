import * as path from "path"
import semverLte from "semver/functions/lte"
import semverMajor from "semver/functions/major"
import { isValidUrl } from "../utils/http/validate_url"
import { InstallationInfo, PackageInfo, setupBin } from "../utils/setup/setupBin"
import { extractExe, extractTarByExe } from "../utils/setup/extract"
import { getSpecificVersionAndUrl, getVersions, semverCoerceIfInvalid } from "../utils/setup/version"
import { setupMacOSSDK } from "../macos-sdk/macos-sdk"
import { addBinExtension } from "../utils/extension/extension"
import { addEnv } from "../utils/env/addEnv"
import { setOutput } from "@actions/core"
import { setupAptPack } from "../utils/setup/setupAptPack"

//================================================
// Version
//================================================

/** The specific and minimum LLVM versions supported by this action. */
export const VERSIONS: Set<string> = getVersions([
  "3.5.0",
  "3.5.1",
  "3.5.2",
  "3.6.0",
  "3.6.1",
  "3.6.2",
  "3.7.0",
  "3.7.1",
  "3.8.0",
  "3.8.1",
  "3.9.0",
  "3.9.1",
  "4.0.0",
  "4.0.1",
  "5.0.0",
  "5.0.1",
  "5.0.2",
  "6.0.0",
  "6.0.1",
  "7.0.0",
  "7.0.1",
  "7.1.0",
  "8.0.0",
  "8.0.1",
  "9.0.0",
  "9.0.1",
  "10.0.0",
  "10.0.1",
  "11.0.0",
  "11.0.1",
  "11.1.0",
  "12.0.0",
  "12.0.1",
  "13.0.0",
])

//================================================
// URL
//================================================

/** Gets a LLVM download URL for GitHub. */
function getGitHubUrl(version: string, prefix: string, suffix: string): string {
  const file = `${prefix}${version}${suffix}`
  return `https://github.com/llvm/llvm-project/releases/download/llvmorg-${version}/${file}`
}

/** Gets a LLVM download URL for https://releases.llvm.org. */
function getReleaseUrl(version: string, prefix: string, suffix: string): string {
  const file = `${prefix}${version}${suffix}`
  return `https://releases.llvm.org/${version}/${file}`
}

/** The LLVM versions that were never released for the Darwin platform. */
const DARWIN_MISSING: Set<string> = new Set([
  "3.5.1",
  "3.6.1",
  "3.6.2",
  "3.7.1",
  "3.8.1",
  "3.9.1",
  "6.0.1",
  "7.0.1",
  "7.1.0",
  "8.0.1",
  "11.0.1",
  "11.1.0",
  "12.0.1",
])

/** Gets an LLVM download URL for the Darwin platform. */
function getDarwinUrl(version: string): string | null {
  if (DARWIN_MISSING.has(version)) {
    return null
  }

  const darwin = version === "9.0.0" ? "-darwin-apple" : "-apple-darwin"
  const prefix = "clang+llvm-"
  const suffix = `-x86_64${darwin}.tar.xz`
  if (semverLte(version, "9.0.1")) {
    return getReleaseUrl(version, prefix, suffix)
  } else {
    return getGitHubUrl(version, prefix, suffix)
  }
}

/**
 * The LLVM versions that should use the last RC version instead of the release version for the Linux (Ubuntu) platform.
 * This is useful when there were binaries released for the Linux (Ubuntu) platform for the last RC version but not for
 * the actual release version.
 */
const UBUNTU_RC: Map<string, string> = new Map()

/** The (latest) Ubuntu versions for each LLVM version. */
const UBUNTU: { [key: string]: string } = {
  "3.5.0": "-ubuntu-14.04",
  "3.5.1": "",
  "3.5.2": "-ubuntu-14.04",
  "3.6.0": "-ubuntu-14.04",
  "3.6.1": "-ubuntu-14.04",
  "3.6.2": "-ubuntu-14.04",
  "3.7.0": "-ubuntu-14.04",
  "3.7.1": "-ubuntu-14.04",
  "3.8.0": "-ubuntu-16.04",
  "3.8.1": "-ubuntu-16.04",
  "3.9.0": "-ubuntu-16.04",
  "3.9.1": "-ubuntu-16.04",
  "4.0.0": "-ubuntu-16.04",
  "5.0.0": "-ubuntu16.04",
  "5.0.1": "-ubuntu-16.04",
  "5.0.2": "-ubuntu-16.04",
  "6.0.0": "-ubuntu-16.04",
  "6.0.1": "-ubuntu-16.04",
  "7.0.0": "-ubuntu-16.04",
  "7.0.1": "-ubuntu-18.04",
  "7.1.0": "-ubuntu-14.04",
  "8.0.0": "-ubuntu-18.04",
  "9.0.0": "-ubuntu-18.04",
  "9.0.1": "-ubuntu-16.04",
  "10.0.0": "-ubuntu-18.04",
  "10.0.1": "-ubuntu-16.04",
  "11.0.0": "-ubuntu-20.04",
  "11.0.1": "-ubuntu-16.04",
  "11.1.0": "-ubuntu-16.04",
  "12.0.0": "-ubuntu-20.04",
  "12.0.1": "-ubuntu-16.04",
  "13.0.0": "-ubuntu-20.04",
}

/** The latest supported LLVM version for the Linux (Ubuntu) platform. */
const MAX_UBUNTU: string = "13.0.0"

/** Gets an LLVM download URL for the Linux (Ubuntu) platform. */
function getLinuxUrl(versionGiven: string): string {
  let version = versionGiven

  const rc = UBUNTU_RC.get(version)
  if (rc !== undefined) {
    version = rc
  }

  let ubuntu: string
  // ubuntu-version is specified
  if (version.includes("ubuntu")) {
    ubuntu = version
  } else if (version !== "" && version in UBUNTU) {
    ubuntu = UBUNTU[version]
  } else {
    // default to the maximum vresion
    ubuntu = UBUNTU[MAX_UBUNTU]
  }

  const prefix = "clang+llvm-"
  const suffix = version === "5.0.0" ? `-linux-x86_64${ubuntu}.tar.xz` : `-x86_64-linux-gnu${ubuntu}.tar.xz`
  if (semverLte(version, "9.0.1")) {
    return getReleaseUrl(version, prefix, suffix)
  } else {
    return getGitHubUrl(version, prefix, suffix)
  }
}

/** The LLVM versions that were never released for the Windows platform. */
const WIN32_MISSING: Set<string> = new Set(["10.0.1"])

/** Gets an LLVM download URL for the Windows platform. */
async function getWin32Url(version: string): Promise<string | null> {
  if (WIN32_MISSING.has(version)) {
    return null
  }

  const prefix = "LLVM-"
  const suffix = semverLte(version, "3.7.0") ? "-win32.exe" : "-win64.exe"

  const olderThan9_1 = semverLte(version, "9.0.1")
  let url: string
  let fallback = false
  if (olderThan9_1) {
    url = getReleaseUrl(version, prefix, suffix)
    if (!(await isValidUrl(url))) {
      fallback = true // fallback to github
    }
  }
  if (fallback || !olderThan9_1) {
    url = getGitHubUrl(version, prefix, suffix)
  }

  return url!
}

/** Gets an LLVM download URL. */
export function getUrl(platform: string, version: string): string | null | Promise<string | null> {
  switch (platform) {
    case "darwin":
      return getDarwinUrl(version)
    case "linux":
      return getLinuxUrl(version)
    case "win32":
      return getWin32Url(version)
    default:
      return null
  }
}

//================================================
// Exports
//================================================

async function getLLVMPackageInfo(version: string, platform: NodeJS.Platform): Promise<PackageInfo> {
  const [specificVersion, url] = await getSpecificVersionAndUrl(VERSIONS, platform, version, getUrl)
  setOutput("version", specificVersion)
  return {
    url,
    extractedFolderName: "",
    binRelativeDir: "bin",
    binFileName: addBinExtension("clang"),
    extractFunction: platform === "win32" ? extractExe : extractTarByExe,
  }
}

export async function setupLLVM(
  version: string,
  setupDir: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _arch: string
): Promise<InstallationInfo> {
  const installationInfo = await setupBin("llvm", version, getLLVMPackageInfo, setupDir)
  await activateLLVM(setupDir, version)
  return installationInfo
}

export async function activateLLVM(directory: string, versionGiven: string) {
  if (process.platform === "linux") {
    // install llvm build dependencies
    await setupAptPack("build-essential") // TODO(question) llvm needs ld. But does it need all the build-essential?
  }

  const version = semverCoerceIfInvalid(versionGiven)

  const lib = path.join(directory, "lib")

  const ld = process.env.LD_LIBRARY_PATH ?? ""
  const dyld = process.env.DYLD_LIBRARY_PATH ?? ""

  addEnv("LLVM_PATH", directory) // the output of this action

  const llvmMajor = semverMajor(version)

  // Setup LLVM as the compiler
  addEnv("LD_LIBRARY_PATH", `${lib}${path.delimiter}${ld}`)
  addEnv("DYLD_LIBRARY_PATH", `${lib}${path.delimiter}${dyld}`)

  if (process.platform !== "win32") {
    // https://github.com/aminya/setup-cpp/issues/6
    addEnv("CPATH", `${directory}/lib/clang/${llvmMajor}/include`)
  }

  addEnv("LDFLAGS", `-L${directory}/lib`)
  addEnv("CPPFLAGS", `-I${directory}/include`)

  addEnv("CC", `${directory}/bin/clang`)
  addEnv("CXX", `${directory}/bin/clang++`)

  addEnv("LIBRARY_PATH", `${directory}/lib`)

  await setupMacOSSDK()
}

/** Setup llvm tools (clang tidy, clang format, etc) without activating llvm and using it as the compiler */
export function setupClangTools(
  version: string,
  setupDir: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _arch: string
): Promise<InstallationInfo> {
  return setupBin("llvm", version, getLLVMPackageInfo, setupDir)
}
