/* eslint-disable require-atomic-updates */
import { info } from "@actions/core"
import { execaSync } from "execa"
import pathExists from "path-exists"
import { addExeExt, dirname, join } from "patha"
import which from "which"
import { addPythonBaseExecPrefix, setupPythonAndPip } from "../../python/python"
import { addPath } from "../env/addEnv"
import { InstallationInfo } from "./setupBin"

let python: string | undefined
let binDirs: string[] | undefined

/** A function that installs a package using pip */
export async function setupPipPack(name: string, version?: string): Promise<InstallationInfo> {
  info(`Installing ${name} ${version ?? ""} via pip`)

  if (python === undefined) {
    python = await setupPythonAndPip()
  }

  execaSync(python, ["-m", "pip", "install", version !== undefined && version !== "" ? `${name}==${version}` : name], {
    stdio: "inherit",
  })

  if (binDirs === undefined) {
    binDirs = await addPythonBaseExecPrefix(python)
  }

  const binDir = await findBinDir(binDirs, name)

  await addPath(binDir)

  return { binDir }
}

async function findBinDir(dirs: string[], name: string) {
  const exists = await Promise.all(dirs.map((dir) => pathExists(join(dir, addExeExt(name)))))
  const dirIndex = exists.findIndex((exist) => exist)
  const foundDir = dirs[dirIndex]

  if (foundDir !== undefined) {
    return foundDir
  }

  const whichDir = which.sync(addExeExt(name), { nothrow: true })
  if (whichDir !== null) {
    return dirname(whichDir)
  }

  return dirs[dirs.length - 1]
}
