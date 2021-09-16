import { exec } from "@actions/exec"
import which from "which"

export async function setupBrew() {
  if (!["darwin", "linux"].includes(process.platform)) {
    return
  }

  if (which.sync("brew", { nothrow: true }) !== null) {
    return
  }

  const exit = await exec(
    `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
  )

  if (exit !== 0) {
    throw new Error(`Failed to install brew`)
  }
}
