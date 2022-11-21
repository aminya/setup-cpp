import execa from "execa"
import { dirname } from "patha"
import which from "which"
import { tmpdir } from "os"
import path, { join } from "path"
import { mkdirP } from "@actions/io"
import { readFileSync } from "fs"
import { addPath } from "../utils/env/addEnv"

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
  const brewTempDirectory = path.join(tmpdir(), "setup_cpp", "brew")
  await mkdirP(brewTempDirectory)

  execa.sync("curl", ["-LJO", "https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh"], {
    cwd: brewTempDirectory,
  })
  const installSh = join(brewTempDirectory, "install.sh")

  if (process.platform === "linux") {
    const installShContent = readFileSync(installSh, "utf-8")

    installShContent.replace("#!/bin/bash", "")
  }

  execa.sync("/bin/bash", [installSh], {
    stdio: "inherit",
    env: {
      NONINTERACTIVE: "1",
    },
  })

  if (process.platform === "linux") {
    binDir = "/home/linuxbrew/.linuxbrew/bin/"
    await addPath(binDir)
  } else {
    binDir = "/usr/local/bin/"
  }

  return { binDir }
}
