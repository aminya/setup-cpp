/* eslint-disable require-atomic-updates */
import { getExecOutput } from "@actions/exec"
import * as execa from "execa"
import which from "which"
import { info } from "@actions/core"
import { addPath } from "../path/addPath"
import { setupPython } from "../../python/python"
import { isBinUptoDate } from "./version"
import { join } from "path"

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
      await setupPython("3.x", "", process.arch)
      pip = "pip3"
    }
  }

  execa.execaSync(pip, ["install", version !== undefined && version !== "" ? `${name}==${version}` : name])

  if (binDir === undefined) {
    if (process.platform === "linux") {
      binDir = "/home/runner/.local/bin/"
    } else if (process.platform === "darwin") {
      binDir = "/usr/local/bin/"
    } else {
      try {
        binDir = join(
          (await getExecOutput('python3 -c "import sys;print(sys.base_exec_prefix);"')).stdout.trim(),
          "Scripts"
        )
      } catch {
        binDir = join(
          (await getExecOutput('python -c "import sys;print(sys.base_exec_prefix);"')).stdout.trim(),
          "Scripts"
        )
      }
    }
    info(`${binDir} to PATH`)
    addPath(binDir)
  }

  return { binDir }
}
