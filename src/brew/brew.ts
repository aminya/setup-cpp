import { tmpdir } from "os"
import path, { join } from "path"
import { mkdirP } from "@actions/io"
import { execaSync } from "execa"
import { readFile } from "fs/promises"
import { addPath } from "os-env"
import { dirname } from "patha"
import which from "which"
import { rcOptions } from "../cli-options"

/* eslint-disable require-atomic-updates */
let binDir: string | undefined

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupBrew(_version: string, _setupDir: string, _arch: string) {
  if (!["darwin", "linux"].includes(process.platform)) {
    return undefined
  }
  if (typeof binDir === "string") {
    return { binDir }
  }

  const maybeBinDir = which.sync("brew", { nothrow: true })
  if (maybeBinDir !== null) {
    binDir = dirname(maybeBinDir)
    return { binDir }
  }

  // brew is not thread-safe
  const brewTempDirectory = path.join(tmpdir(), "setup-cpp", "brew")
  await mkdirP(brewTempDirectory)

  execaSync("curl", ["-LJO", "https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh"], {
    cwd: brewTempDirectory,
  })
  const installSh = join(brewTempDirectory, "install.sh")

  if (process.platform === "linux") {
    const installShContent = await readFile(installSh, "utf-8")
    installShContent.replace("#!/bin/bash", "")
  }

  execaSync("/bin/bash", [installSh], {
    stdio: "inherit",
    env: {
      NONINTERACTIVE: "1",
    },
  })

  binDir = getBrewPath()
  await addPath(binDir, rcOptions)

  return { binDir }
}

export function getBrewPath() {
  if (process.platform === "linux") {
    return "/home/linuxbrew/.linuxbrew/bin/"
  } else {
    return "/usr/local/bin/"
  }
}
