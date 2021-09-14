import * as core from "@actions/core"
import * as exec from "@actions/exec"
import * as io from "@actions/io"
import * as tc from "@actions/tool-cache"
import * as path from "path"
import semverLte from "semver/functions/lte"

//================================================
// Version
//================================================

/**
 * Gets the specific and minimum LLVM versions that can be used to refer to the supplied specific LLVM versions (e.g.,
 * `3`, `3.5`, `3.5.2` for `3.5.2`).
 */
function getVersions(specific: string[]): Set<string> {
  const versions = new Set(specific)

  for (const version of specific) {
    versions.add(/^\d+/.exec(version)![0])
    versions.add(/^\d+\.\d+/.exec(version)![0])
  }

  return versions
}

/** The specific and minimum LLVM versions supported by this action. */
const VERSIONS: Set<string> = getVersions([
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
])

/**
 * Gets the specific LLVM versions supported by this action compatible with the supplied (specific or minimum) LLVM
 * version in descending order of release (e.g., `5.0.2`, `5.0.1`, and `5.0.0` for `5`).
 */
function getSpecificVersions(version: string): string[] {
  return Array.from(VERSIONS)
    .filter((v) => /^\d+\.\d+\.\d+$/.test(v) && v.startsWith(version))
    .sort()
    .reverse()
}

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
const UBUNTU_RC: Map<string, string> = new Map([["12.0.1", "12.0.1-rc4"]])

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
  "12.0.1-rc4": "-ubuntu-21.04",
}

/** The latest supported LLVM version for the Linux (Ubuntu) platform. */
const MAX_UBUNTU: string = "12.0.1-rc4"

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
  } else if (version !== "") {
    ubuntu = UBUNTU[version]
  } else {
    // default to the maximum vresion
    ubuntu = UBUNTU[MAX_UBUNTU]
  }

  const prefix = "clang+llvm-"
  const suffix = `-x86_64-linux-gnu${ubuntu}.tar.xz`
  if (semverLte(version, "9.0.1")) {
    return getReleaseUrl(version, prefix, suffix)
  } else {
    return getGitHubUrl(version, prefix, suffix)
  }
}

/** The LLVM versions that were never released for the Windows platform. */
const WIN32_MISSING: Set<string> = new Set(["10.0.1"])

/** Gets an LLVM download URL for the Windows platform. */
function getWin32Url(version: string): string | null {
  if (WIN32_MISSING.has(version)) {
    return null
  }

  const prefix = "LLVM-"
  const suffix = semverLte(version, "3.7.0") ? "-win32.exe" : "-win64.exe"
  if (semverLte(version, "9.0.1")) {
    return getReleaseUrl(version, prefix, suffix)
  } else {
    return getGitHubUrl(version, prefix, suffix)
  }
}

/** Gets an LLVM download URL. */
function getUrl(platform: string, version: string): string | null {
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

/** Gets the most recent specific LLVM version for which there is a valid download URL. */
export function getSpecificVersionAndUrl(platform: string, version: string): [string, string] {
  if (!VERSIONS.has(version)) {
    throw new Error(`Unsupported target! (platform='${platform}', version='${version}')`)
  }

  for (const specificVersion of getSpecificVersions(version)) {
    const url = getUrl(platform, specificVersion)
    if (url !== null) {
      return [specificVersion, url]
    }
  }

  throw new Error(`Unsupported target! (platform='${platform}', version='${version}')`)
}

//================================================
// Action
//================================================

const DEFAULT_NIX_DIRECTORY = "./llvm"
const DEFAULT_WIN32_DIRECTORY = "C:/Program Files/LLVM"

async function install(version: string, directory: string): Promise<void> {
  const platform = process.platform
  const [specificVersion, url] = getSpecificVersionAndUrl(platform, version)
  core.setOutput("version", specificVersion)

  core.info(`Installing LLVM and Clang ${version} (${specificVersion})...`)
  core.info(`Downloading and extracting '${url}'...`)
  const archive = await tc.downloadTool(url)

  let exit
  if (platform === "win32") {
    exit = await exec.exec("7z", ["x", archive, `-o${directory}`])
  } else {
    await io.mkdirP(directory)
    exit = await exec.exec("tar", ["xf", archive, "-C", directory, "--strip-components=1"])
  }

  if (exit !== 0) {
    throw new Error("Could not extract LLVM and Clang binaries.")
  }

  core.info(`Installed LLVM and Clang ${version} (${specificVersion})!`)
  core.info(`Install location: ${directory}`)
}

export async function setupLLVM(version: string, directoryGiven?: string, cached: boolean = false): Promise<void> {
  let directory = directoryGiven
  if (directory === "" || directory === undefined) {
    directory = process.platform === "win32" ? DEFAULT_WIN32_DIRECTORY : DEFAULT_NIX_DIRECTORY
  }

  directory = path.resolve(directory)

  if (cached) {
    core.info(`Using cached LLVM and Clang ${version}...`)
  } else {
    await install(version, directory)
  }

  const bin = path.join(directory, "bin")
  const lib = path.join(directory, "lib")

  core.addPath(bin)

  const ld = process.env.LD_LIBRARY_PATH ?? ""
  const dyld = process.env.DYLD_LIBRARY_PATH ?? ""

  core.exportVariable("LLVM_PATH", directory)
  core.exportVariable("LD_LIBRARY_PATH", `${lib}${path.delimiter}${ld}`)
  core.exportVariable("DYLD_LIBRARY_PATH", `${lib}${path.delimiter}${dyld}`)
}
