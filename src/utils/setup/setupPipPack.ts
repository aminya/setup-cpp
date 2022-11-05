/* eslint-disable require-atomic-updates */
import execa from "execa"
import { info } from "@actions/core"
import { addPythonBaseExecPrefix, setupPythonAndPip } from "../../python/python"
import { InstallationInfo } from "./setupBin"
import { existsSync } from "fs"
import { addExeExt, dirname, join } from "patha"
import { addPath } from "../env/addEnv"
import which from "which"

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

  const binDir = findBinDir(binDirs, name)

  await addPath(binDir)

  return { binDir }
}

function findBinDir(dirs: string[], name: string) {
  const foundDir = dirs.find((dir) => existsSync(join(dir, addExeExt(name))))
  if (foundDir !== undefined) {
    return foundDir
  }

  const whichDir = which.sync(addExeExt(name), { nothrow: true })
  if (whichDir !== null) {
    return dirname(whichDir)
  }

  return dirs[dirs.length - 1]
}
