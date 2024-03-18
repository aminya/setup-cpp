import semverLte from "semver/functions/lte"
import { isUrlOnline } from "is-url-online"
import { getSpecificVersionAndUrl, getSpecificVersions, getVersions } from "../utils/setup/version"
import { info, warning } from "ci-log"
import { PackageInfo } from "../utils/setup/setupBin"
import { addExeExt } from "patha"
import { extractExe, extractTarByExe } from "../utils/setup/extract"

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
  "13.0.1",
  "14.0.0",
  "14.0.1",
  "14.0.2",
  "14.0.3",
  "14.0.4",
  "14.0.5",
  "14.0.6",
  "15.0.0",
  "15.0.1",
  "15.0.2",
  "15.0.3",
  "15.0.4",
  "15.0.5",
  "15.0.6",
  "15.0.7",
  "16.0.0",
  "16.0.1",
  "16.0.2",
  "16.0.3",
  "16.0.4",
  "16.0.5",
  "16.0.6",
  "17.0.1",
  "17.0.2",
  "17.0.3",
  "17.0.4",
  "17.0.5",
  "17.0.6",
  "18.1.0",
  "18.1.1",
])

/** The LLVM versions that were never released for the Windows platform. */
const WIN32_MISSING: Set<string> = new Set(["10.0.1", "15.0.5", "15.0.6", "17.0.5"])

/** The LLVM versions that were never released for the Darwin platform. */
const DARWIN_MISSING = new Set([
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
  // missing x86_64
  // TODO add arm64 support
  "15.0.4",
  "15.0.5",
  "15.0.6",
  "16.0.0",
  "16.0.1",
  "16.0.2",
  "16.0.3",
  "16.0.4",
  "16.0.5",
  "16.0.6",
  "17.0.1",
  "17.0.2",
  "17.0.3",
  "17.0.4",
  "17.0.5",
  "17.0.6",
  "18.1.0",
  "18.1.1",
])

/**
 * The LLVM versions that should use the last RC version instead of the release version for the Linux (Ubuntu) platform.
 * This is useful when there were binaries released for the Linux (Ubuntu) platform for the last RC version but not for
 * the actual release version.
 */
const UBUNTU_RC: Map<string, string> = new Map()

/**
 * The (latest) Ubuntu versions for each LLVM version.
 *
 * https://github.com/llvm/llvm-project/releases/tag/llvmorg-14.0.1 or https://releases.llvm.org/14.0.1
 */
// TODO change based on ubuntu version
const UBUNTU_SUFFIX_MAP: { [key: string]: string } = {
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
  "13.0.0-ubuntu-16.04": "-ubuntu-16.04",
  "13.0.0-ubuntu-20.04": "-ubuntu-20.04",
  "13.0.1": "-ubuntu-18.04",
  "13.0.1-ubuntu-18.04": "-ubuntu-18.04",
  "14.0.0": "-ubuntu-18.04",
  // "14.0.1": "-ubuntu-18.04",  // only available for powerpc64le
  "15.0.2": "-rhel86",
  "15.0.5": "-ubuntu-18.04",
  "15.0.6": "-ubuntu-18.04",
  "16.0.0": "-ubuntu-18.04",
  "16.0.2": "-ubuntu-22.04",
  "16.0.3": "-ubuntu-22.04",
  "16.0.4": "-ubuntu-22.04",
  "17.0.2": "-ubuntu-22.04",
  "17.0.4": "-ubuntu-22.04",
  "17.0.5": "-ubuntu-22.04",
  "17.0.6": "-ubuntu-22.04",
  "18.1.0": "-ubuntu-22.04",
  "18.1.1": "-ubuntu-22.04",
}

/** The latest supported LLVM version for the Linux (Ubuntu) platform. */
const MAX_UBUNTU: string = "18.1.1"

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

/** Gets an LLVM download URL for the Linux (Ubuntu) platform. */
export function getLinuxUrl(versionGiven: string): string {
  let version = versionGiven

  const rc = UBUNTU_RC.get(version)
  if (rc !== undefined) {
    version = rc
  }

  let linuxVersion: string
  // ubuntu-version is specified
  if (version.includes("ubuntu")) {
    const givenUbuntuVersion = version.replace(/-ubuntu-.*/, "")
    if (!VERSIONS.has(givenUbuntuVersion)) {
      throw new Error(`Unsupported Ubuntu version: ${givenUbuntuVersion}`)
    }
    linuxVersion = version.replace(givenUbuntuVersion, "")
    version = getSpecificVersions(VERSIONS, givenUbuntuVersion)[0]
  } else if (version !== "" && version in UBUNTU_SUFFIX_MAP) {
    linuxVersion = UBUNTU_SUFFIX_MAP[version]
  } else {
    // default to the maximum version
    linuxVersion = UBUNTU_SUFFIX_MAP[MAX_UBUNTU]
    warning(`Falling back to LLVM version ${MAX_UBUNTU} ${linuxVersion} for the Ubuntu.`)
  }

  const prefix = "clang+llvm-"

  let suffix: string
  if (version === "5.0.0") {
    suffix = `-linux-x86_64${linuxVersion}.tar.xz`
  } else if (linuxVersion.includes("-rhel86")) {
    suffix = `-x86_64-unknown-linux-gnu${linuxVersion}.tar.xz`
  } else {
    suffix = `-x86_64-linux-gnu${linuxVersion}.tar.xz`
  }

  if (semverLte(version, "9.0.1")) {
    return getReleaseUrl(version, prefix, suffix)
  } else {
    return getGitHubUrl(version, prefix, suffix)
  }
}

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
    if (!(await isUrlOnline(url))) {
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

export async function getLLVMPackageInfo(
  version: string,
  platform: NodeJS.Platform,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _arch: string,
): Promise<PackageInfo> {
  const [specificVersion, url] = await getSpecificVersionAndUrl(VERSIONS, platform, version, getUrl)
  info(`specific llvm version: ${specificVersion}`)
  return {
    url,
    extractedFolderName: "",
    binRelativeDir: "bin",
    binFileName: addExeExt("clang"),
    extractFunction:
      platform === "win32"
        ? extractExe
        : (file: string, dest: string) => {
            return extractTarByExe(file, dest, ["--strip-components=1"])
          },
  }
}
