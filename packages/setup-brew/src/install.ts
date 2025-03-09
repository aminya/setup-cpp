import { tmpdir } from "os"
import { dirname, join } from "path"
import { type AddPathOptions, addPath } from "envosman"
import { execaSync } from "execa"
import { DownloaderHelper } from "node-downloader-helper"
import { installAptPack } from "setup-apt"
import which from "which"
import type { InstallationInfo } from "./InstallationInfo.js"

/* eslint-disable require-atomic-updates */
let binDir: string | undefined

export type SetupBrewOptions = {
  /** Options for adding the brew path to the rc file */
  rcOptions?: AddPathOptions
  /** (Unsupported option) The version of brew to install */
  version?: never
  /** (Unsupported option) The directory where brew should be installed */
  setupDir?: never
  /** (Unsupported option) The architecture of the system */
  arch?: never
}

export async function setupBrew(options: SetupBrewOptions = {}): Promise<InstallationInfo | undefined> {
  // brew is only available on darwin and linux
  if (!["darwin", "linux"].includes(process.platform)) {
    return undefined
  }

  // check if the function has already been called
  if (typeof binDir === "string") {
    return { binDir }
  }

  // check if brew is already installed
  const maybeBinDir = await which("brew", { nothrow: true })
  if (maybeBinDir !== null) {
    binDir = dirname(maybeBinDir)
    return { binDir }
  }

  // download the installation script
  await installAptPack([{ name: "ca-certificates" }])
  const dl = new DownloaderHelper("https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh", tmpdir(), {
    fileName: "install-brew.sh",
  })
  dl.on("error", (err) => {
    throw new Error(`Failed to download the brew installer script: ${err}`)
  })
  await dl.start()

  // brew installation is not thread-safe
  execaSync("/bin/bash", [dl.getDownloadPath()], {
    stdio: "inherit",
    env: {
      NONINTERACTIVE: "1",
    },
  })

  // add the bin directory to the PATH
  binDir = getBrewBinDir()
  await addPath(binDir, options.rcOptions)

  return { binDir }
}

/**
 * Get the path to the bin directory of brew
 * @returns {string} The path where brew binary is installed
 *
 * Based on the installation script from https://brew.sh
 */
export function getBrewBinDir() {
  return join(getBrewDir(), "bin")
}

export function getBrewBinPath() {
  return join(getBrewBinDir(), "brew")
}

/**
 * Get the path where brew is installed
 * @returns {string} The path where brew is installed
 *
 * Based on the installation script from https://brew.sh
 */
export function getBrewDir() {
  if (process.platform === "darwin") {
    if (process.arch === "arm64") {
      return "/opt/homebrew"
    } else {
      return "/usr/local"
    }
  }

  if (process.platform === "linux") {
    return "/home/linuxbrew/.linuxbrew"
  }

  throw new Error("Unsupported platform for brew")
}
