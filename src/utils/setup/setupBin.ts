import { tmpdir } from "os"
import { basename, join } from "path"
import { cacheDir, downloadTool, find } from "@actions/tool-cache"
import ciInfo from "ci-info"
const { GITHUB_ACTIONS } = ciInfo
import { info, warning } from "ci-log"
import { addPath } from "envosman"
import { chmod } from "fs/promises"
import { pathExists } from "path-exists"
import retry from "retry-as-promised"
import { maybeGetInput, rcOptions } from "../../options.js"
import { getArchiveType, getExtractFunction } from "./extract.js"

/** A type that describes a package */
export type PackageInfo = {
  /** Url to download the package */
  url: string
  /** The top folder name once it is extracted. It can be `""` if there is no top folder */
  extractedFolderName: string
  /** The relative directory in which the binary is located. It can be `""` if the exe is in the top folder */
  binRelativeDir: string
  /** The main binary file. */
  binFileName: string
  /** The function to extract the downloaded archive. It can be `undefined`, if the binary itself is downloaded directly. */
  extractFunction?: (file: string, dest: string) => Promise<unknown>
}

export type InstallationInfo = {
  /** The top install dir */
  installDir?: string
  binDir: string
  bin?: string
}

/**
 * A function that:
 *
 * - Downloads and extracts a package
 * - Adds the bin path of the package to PATH
 * - Caches the downloaded directory into tool cache for usage from other sessions
 *
 * @returns The installation directory
 */
export async function setupBin(
  name: string,
  version: string,
  getPackageInfo: (version: string, platform: NodeJS.Platform, arch: string) => PackageInfo | Promise<PackageInfo>,
  setupDir: string,
  arch: string,
): Promise<InstallationInfo> {
  info(`Installing ${name} ${version} ${arch} via direct downloading`)

  process.env.RUNNER_TEMP = process.env.RUNNER_TEMP ?? tmpdir()
  process.env.RUNNER_TOOL_CACHE = process.env.RUNNER_TOOL_CACHE ?? join(tmpdir(), "setup-cpp", "hostedtoolcache")

  const { url, binRelativeDir, binFileName, extractedFolderName, extractFunction } = await getPackageInfo(
    version,
    process.platform,
    arch,
  )

  // Restore from cache (if found).
  if (GITHUB_ACTIONS) {
    try {
      const dir = find(name, version)
      if (dir) {
        const installDir = join(dir, extractedFolderName)
        const binDir = join(installDir, binRelativeDir)
        if (await pathExists(join(binDir, binFileName))) {
          info(`${name} ${version} was found in the cache at ${binDir}.`)
          await addPath(binDir, rcOptions)

          return { installDir, binDir }
        }
      }
    } catch {
      // fails on a local machine?
    }
  }

  const installDir = join(setupDir, extractedFolderName)
  const binDir = join(installDir, binRelativeDir)
  const binFile = join(binDir, binFileName)

  await downloadExtractInstall(binDir, binFile, name, version, url, setupDir, extractFunction, arch)

  await cacheInstallation(setupDir, name, version)

  return { installDir, binDir }
}

async function downloadExtractInstall(
  binDir: string,
  binFile: string,
  name: string,
  version: string,
  url: string,
  setupDir: string,
  givenExtractFunction: PackageInfo["extractFunction"],
  arch: string,
) {
  // download ane extract the package into the installation directory.
  if ((await Promise.all([pathExists(binDir), pathExists(binFile)])).includes(false)) {
    try {
      const downloaded = await tryDownload(name, version, url)

      info(`Extracting ${downloaded} to ${setupDir}`)

      const extractFunction = givenExtractFunction ?? getExtractFunction(getArchiveType(url))
      await extractFunction(downloaded, setupDir)
    } catch (err) {
      throw new Error(`Failed to download ${name} ${version} ${arch} from ${url}: ${err}`)
    }
  }

  // Adding the bin dir to the path
  /** The directory which the tool is installed to */
  info(`Add ${binDir} to PATH`)
  await addPath(binDir, rcOptions)

  // Check if the binary exists after extraction
  if (!(await pathExists(binFile))) {
    throw new Error(`Failed to find the binary ${binFile} after extracting ${name} ${version} ${arch}`)
  }

  // make the binary executable on non-windows platforms
  if (process.platform !== "win32") {
    try {
      await chmod(binFile, "755")
    } catch (err) {
      warning(`Failed to make ${binFile} executable: ${err}`)
    }
  }
}

async function tryDownload(name: string, version: string, url: string) {
  info(`Download ${name} ${version}`)
  // try to download the package 4 times with 2 seconds delay
  const downloaded = await retry(
    () => {
      const prefix = `${Date.now()}-setup-cpp-`
      const downloadedFilePath = join(process.env.RUNNER_TEMP ?? tmpdir(), `${prefix}${basename(url)}`)

      return downloadTool(url, downloadedFilePath)
    },
    { name: url, max: 4, backoffBase: 2000, report: (err) => info(err) },
  )
  return downloaded
}

async function cacheInstallation(setupDir: string, name: string, version: string) {
  // check if inside Github Actions. If so, cache the installation
  if (GITHUB_ACTIONS && typeof process.env.RUNNER_TOOL_CACHE === "string") {
    if (maybeGetInput("cache-tools") === "true" || process.env.CACHE_TOOLS === "true") {
      await cacheDir(setupDir, name, version)
    }
  }
}
