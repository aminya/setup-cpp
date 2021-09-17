import { find, downloadTool, cacheDir } from "@actions/tool-cache"
import { addPath, info } from "@actions/core"
import { join } from "path"
import { existsSync } from "fs"
import * as hasha from "hasha"
import { tmpdir } from "os"

/** A type that describes a package */
export type PackageInfo = {
  /** Url to download the package */
  url: string
  /** The top folder name once it is extracted. It can be `""` if there is no top folder */
  extractedFolderName: string
  /** The relative directory in which the binary is located. It can be `""` if the exe is in the top folder */
  binRelativeDir: string
  /** The function to extract the downloaded archive. It can be `undefined`, if the binary itself is downloaded directly. */
  extractFunction?: {
    (file: string, dest: string): Promise<string> | Promise<void>
  }
}

export type InstallationInfo = {
  /** The top install dir */
  installDir?: string
  binDir: string
}

/**
 * A function that:
 *
 * - Downlodas and extracts a package
 * - Adds the bin path of the package to PATH
 * - Caches the dowloaded directory into tool cache for usage from other sessions
 *
 * @returns The installation directory
 */
export async function setupBin(
  name: string,
  version: string,
  getPackageInfo: (version: string, platform: NodeJS.Platform) => PackageInfo | Promise<PackageInfo>,
  setupCppDir: string
): Promise<InstallationInfo> {
  process.env.RUNNER_TEMP = process.env.RUNNER_TEMP ?? tmpdir()

  const { url, binRelativeDir, extractedFolderName, extractFunction } = await getPackageInfo(version, process.platform)

  // Restore from cache (if found).
  try {
    const dir = find(name, version)
    if (dir) {
      info(`${name} ${version} was found in the cache.`)
      const installDir = join(dir, extractedFolderName)
      const binDir = join(installDir, binRelativeDir)
      addPath(binDir)
      return { installDir, binDir }
    }
  } catch {
    // fails on a local machine?
  }

  // Get an unique output directory name from the URL.
  const key: string = await hasha.async(url)
  const rootDir = join(setupCppDir, key)

  // download ane extract the package into the installation directory.
  if (!existsSync(rootDir)) {
    info(`Download and extract ${name} ${version}`)
    const downloaded = await downloadTool(url)
    await extractFunction?.(downloaded, rootDir)
  }

  const installDir = join(rootDir, extractedFolderName)
  const binDir = join(installDir, binRelativeDir)

  // Adding the bin dir to the path
  /** The directory which the tool is installed to */
  info(`Add ${binDir} to PATH`)
  addPath(binDir)

  // check if inside Github Actions. If so, cache the installation
  if (typeof process.env.RUNNER_TOOL_CACHE === "string") {
    await cacheDir(rootDir, name, version)
  }

  return { installDir, binDir }
}
/** Add bin extension to a binary. This will be `.exe` on Windows. */
export function addBinExtension(name: string) {
  if (process.platform === "win32") {
    return `${name}.exe`
  }
  return name
}
