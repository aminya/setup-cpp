import { execFileSync } from "child_process"
import which from "which"

let binDir: string | undefined

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupBrew(_version: string, _setupCppDir: string, _arch: string) {
  if (!["darwin", "linux"].includes(process.platform)) {
    return undefined
  }
  if (typeof binDir === "string") {
    return { binDir }
  }

  const maybeBinDir = which.sync("brew", { nothrow: true })
  if (maybeBinDir !== null) {
    binDir = maybeBinDir
    return { binDir }
  }

  // brew is not thread-safe
  execFileSync(`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`, {
    stdio: "inherit",
  })
  binDir = "/usr/local/bin/"

  return { binDir }
}
