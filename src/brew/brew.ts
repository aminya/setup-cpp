import { execFileSync } from "child_process"
import which from "which"

export function setupBrew() {
  if (!["darwin", "linux"].includes(process.platform)) {
    return
  }

  if (which.sync("brew", { nothrow: true }) !== null) {
    return
  }

  // brew is not thread-safe
  execFileSync(`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`, {
    stdio: "inherit",
  })
}
