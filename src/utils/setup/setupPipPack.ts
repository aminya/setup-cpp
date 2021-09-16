/* eslint-disable require-atomic-updates */
import { exec, getExecOutput } from "@actions/exec"
import which from "which"
import { addPath, startGroup, endGroup } from "@actions/core"
import { setupPython } from "../../python/python"
import { isBinUptoDate } from "./version"

let pip: string | undefined

let binDir: string | undefined

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

  if (binDir === undefined) {
    if (process.platform === "linux") {
      binDir = "/home/runner/.local/bin/"
    } else if (process.platform === "darwin") {
      binDir = "/usr/local/bin/"
    } else {
      binDir = (await getExecOutput("python -c 'import sys; print(sys.base_exec_prefix)'")).stdout
    }
    try {
      startGroup(`${binDir} to PATH`)
      addPath(binDir)
    } finally {
      endGroup()
    }
  }

  return binDir
}
