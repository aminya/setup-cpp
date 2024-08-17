import { tmpdir } from "os"
import { join } from "path"
import { addPath } from "envosman"
import { execaSync } from "execa"
import { dirname } from "patha"
import which from "which"
import { rcOptions } from "../cli-options.js"
import { HttpClient } from "@actions/http-client"
import { writeFile } from "fs/promises"

/* eslint-disable require-atomic-updates */
let binDir: string | undefined

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupBrew(_version: string, _setupDir: string, _arch: string) {
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
  const installerPath = join(tmpdir(), "install-brew.sh")

  const http = new HttpClient("setup-brew")
  const response = await http.get("https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh")
  if (response.message.statusCode !== 200) {
    throw new Error(`Failed to download brew installation script: ${response.message.statusCode}`)
  }

  await writeFile(installerPath, await response.readBody())

  // brew installation is not thread-safe
  execaSync("/bin/bash", [installerPath], {
    stdio: "inherit",
    env: {
      NONINTERACTIVE: "1",
    },
  })

  // add the bin directory to the PATH
  binDir = getBrewPath()
  await addPath(binDir, rcOptions)

  return { binDir }
}

/**
 * Get the path where brew is installed
 * @returns {string} The path where brew is installed
 *
 * Based on the installation script from https://brew.sh
 */
export function getBrewPath() {
  if (process.platform === "darwin") {
    if (process.arch === "arm64") {
      return "/opt/homebrew/bin/"
    } else {
      return "/usr/local/bin/"
    }
  }

  if (process.platform === "linux") {
    return "/home/linuxbrew/.linuxbrew/bin/"
  }

  throw new Error("Unsupported platform for brew")
}
