import { exec } from "@actions/exec"
import which from "which"
import { addPath, startGroup, endGroup } from "@actions/core"

/** A function that installs a package using pip */
export async function setupPipPack(name: string, version?: string) {
  // check if it exists
  const pip = which.sync("pip3", { nothrow: true }) !== null ? "pip3" : "pip"

  const exit = await exec(pip, ["install", version !== undefined ? `${name}==${version}` : name])
  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }

  if (process.platform === "linux") {
    try {
      startGroup(`Add /home/runner/.local/bin to PATH`)
      addPath("/home/runner/.local/bin/")
    } finally {
      endGroup()
    }
  }
}
