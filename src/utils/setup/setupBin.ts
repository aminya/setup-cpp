import { find, downloadTool, cacheDir } from "@actions/tool-cache"
import { info } from "@actions/core"
import { addPath } from "../env/addEnv"
import { join } from "patha"

import { tmpdir } from "os"
import ciDetect from "@npmcli/ci-detect"
import { setupAptPack } from "./setupAptPack"
import { setupPacmanPack } from "./setupPacmanPack"
import { isArch } from "../env/isArch"
import { hasDnf } from "../env/hasDnf"
import { setupDnfPack } from "./setupDnfPack"
import { isUbuntu } from "../env/isUbuntu"
import pathExists from "path-exists"

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
  extractFunction?: {
    (file: string, dest: string): Promise<string> | Promise<void>
  }
}

export type InstallationInfo = {
  /** The top install dir */
  installDir?: string
  binDir: string
}

let didInit: boolean = false

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
  arch: string
): Promise<InstallationInfo> {
  info(`Installing ${name} ${version} ${arch} via direct downloading`)

  process.env.RUNNER_TEMP = process.env.RUNNER_TEMP ?? tmpdir()
  process.env.RUNNER_TOOL_CACHE = process.env.RUNNER_TOOL_CACHE ?? join(tmpdir(), "setup-cpp", "hostedtoolcache")

  const { url, binRelativeDir, binFileName, extractedFolderName, extractFunction } = await getPackageInfo(
    version,
    process.platform,
    arch
  )

  // Restore from cache (if found).
  if (ciDetect() === "github-actions") {
    try {
      const dir = find(name, version)
      if (dir) {
        const installDir = join(dir, extractedFolderName)
        const binDir = join(installDir, binRelativeDir)
        if (await pathExists(join(binDir, binFileName))) {
          info(`${name} ${version} was found in the cache at ${binDir}.`)
          await addPath(binDir)

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

  // download ane extract the package into the installation directory.
  if ((await Promise.all([pathExists(binDir), pathExists(binFile)])).includes(false)) {
    info(`Download and extract ${name} ${version}`)

    if (!didInit) {
      if (process.platform === "linux") {
        // extraction dependencies
        if (isArch()) {
          setupPacmanPack("unzip")
          setupPacmanPack("tar")
          setupPacmanPack("xz")
        } else if (hasDnf()) {
          setupDnfPack("unzip")
          setupDnfPack("tar")
          setupDnfPack("xz")
        } else if (isUbuntu()) {
          await setupAptPack([{ name: "unzip" }, { name: "tar" }, { name: "xz-utils" }])
        }
      }
      // eslint-disable-next-line require-atomic-updates
      didInit = true
    }

    try {
      const downloaded = await downloadTool(url)
      await extractFunction?.(downloaded, setupDir)
      // if (typeof extractedBinDir === "string") {
      //   binDir = extractedBinDir
      //   installDir = extractedBinDir
      // }
    } catch (err) {
      throw new Error(`Failed to download ${name} ${version} ${arch} from ${url}: ${err}`)
    }
  }

  // Adding the bin dir to the path
  /** The directory which the tool is installed to */
  info(`Add ${binDir} to PATH`)
  await addPath(binDir)

  // check if inside Github Actions. If so, cache the installation
  if (ciDetect() === "github-actions" && typeof process.env.RUNNER_TOOL_CACHE === "string") {
    await cacheDir(setupDir, name, version)
  }

  return { installDir, binDir }
}
