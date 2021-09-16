/* eslint-disable require-atomic-updates */
import { exec } from "@actions/exec"
import which from "which"
import { addPath, startGroup, endGroup } from "@actions/core"
import { setupPython } from "../../python/python"
import { isBinUptoDate } from "./version"

let pip: string | undefined

/** A function that installs a package using pip */
export async function setupPipPack(name: string, version?: string) {
  // setup python and pip if needed
  if (pip === undefined) {
    if (which.sync("pip3", { nothrow: true }) !== null) {
      pip = "pip3"
    } else if (which.sync("pip", { nothrow: true }) !== null && (await isBinUptoDate("python", "3.0.0"))) {
      pip = "pip"
    } else {
      await setupPython("3.x", "", "")
      pip = "pip3"
    }
  }

  const exit = await exec(pip, ["install", version !== undefined && version !== "" ? `${name}==${version}` : name])
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
