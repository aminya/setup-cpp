/* eslint-disable require-atomic-updates */
import execa from "execa"
import { info } from "@actions/core"
import { addPythonBaseExecPrefix, setupPythonAndPip } from "../../python/python"
import { InstallationInfo } from "./setupBin"
import { existsSync } from "fs"
import { addExeExt, join } from "patha"

let python: string | undefined
let binDirs: string[] | undefined

/** A function that installs a package using pip */
export async function setupPipPack(name: string, version?: string): Promise<InstallationInfo> {
  info(`Installing ${name} ${version ?? ""} via pip`)

  if (python === undefined) {
    python = await setupPythonAndPip()
  }

  execa.sync(python, ["-m", "pip", "install", version !== undefined && version !== "" ? `${name}==${version}` : name], {
    stdio: "inherit",
  })

  if (binDirs === undefined) {
    binDirs = await addPythonBaseExecPrefix(python)
  }

  const binDir = binDirs.find((dir) => existsSync(join(dir, addExeExt(name)))) ?? binDirs.pop()!

  return { binDir }
}
