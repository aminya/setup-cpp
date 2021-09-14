import { find, downloadTool, cacheDir } from "@actions/tool-cache"
import { addPath, group, startGroup, endGroup, info } from "@actions/core"
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
    (file: string, dest: string): Promise<string>
  }
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
): Promise<string> {
  process.env.RUNNER_TEMP = process.env.RUNNER_TEMP ?? tmpdir()

  // Restore from cache (if found).
  const dir = find(name, version)
  if (dir) {
    info(`${name} ${version} was found in the cache.`)
    addPath(dir)
    return dir
  }

  const { url, binRelativeDir, extractedFolderName, extractFunction } = await getPackageInfo(version, process.platform)

  // Get an unique output directory name from the URL.
  const key: string = await hasha.async(url)
  const installDir = join(setupCppDir, key)

  // download ane extract the package into the installation directory.
  if (!existsSync(installDir)) {
    await group(`Download and extract ${name} ${version}`, async () => {
      const downloaded = await downloadTool(url)
      await extractFunction?.(downloaded, installDir)
    })
  }

  // Adding the bin dir to the path
  try {
    /** The directory which the tool is installed to */
    const binDir = join(installDir, extractedFolderName, binRelativeDir)
    startGroup(`Add ${binDir} to PATH`)
    addPath(binDir)
  } finally {
    endGroup()
  }

  // check if inside Github Actions. If so, cache the installation
  if (typeof process.env.RUNNER_TOOL_CACHE === "string") {
    await cacheDir(installDir, name, version)
  }

  return installDir
}
