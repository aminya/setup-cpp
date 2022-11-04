/* eslint-disable require-atomic-updates */
import execa from "execa"
import { info } from "@actions/core"
import { addPythonBaseExecPrefix, setupPythonAndPip } from "../../python/python"
import { InstallationInfo } from "./setupBin"

let python: string | undefined
let binDir: string | undefined

/** A function that installs a package using pip */
export async function setupPipPack(name: string, version?: string): Promise<InstallationInfo> {
  info(`Installing ${name} ${version ?? ""} via pip`)

  if (python === undefined) {
    python = await setupPythonAndPip()
  }

  execa.sync(python, ["-m", "pip", "install", version !== undefined && version !== "" ? `${name}==${version}` : name], {
    stdio: "inherit",
  })

  if (binDir === undefined) {
    binDir = await addPythonBaseExecPrefix(python)
  }

  return { binDir }
}
