import { info } from "@actions/core"
import { execaSync } from "execa"
import { pathExists } from "path-exists"
import { addExeExt, dirname, join } from "patha"
import which from "which"
import { addPythonBaseExecPrefix, setupPython } from "../../python/python"
import { addPath } from "../env/addEnv"
import { InstallationInfo } from "./setupBin"
import { getVersion } from "../../versions/versions"

/* eslint-disable require-atomic-updates */
let python: string | undefined
let execPaths: string[] | undefined

/** A function that installs a package using pip */
export async function setupPipPack(name: string, version?: string): Promise<InstallationInfo> {
  info(`Installing ${name} ${version ?? ""} via pip`)

  if (python === undefined) {
    python = (await setupPython(getVersion("python", undefined), "", process.arch)).bin!
  }

  execaSync(python, ["-m", "pip", "install", version !== undefined && version !== "" ? `${name}==${version}` : name], {
    stdio: "inherit",
  })

  if (execPaths === undefined) {
    execPaths = await addPythonBaseExecPrefix(python)
  }

  const binDir = await findBinDir(execPaths, name)

  await addPath(binDir)

  return { binDir }
}

async function findBinDir(dirs: string[], name: string) {
  const exists = await Promise.all(dirs.map((dir) => pathExists(join(dir, addExeExt(name)))))
  const dirIndex = exists.findIndex((exist) => exist)
  if (dirIndex !== -1) {
    const foundDir = dirs[dirIndex]
    return foundDir
  }

  const whichDir = which.sync(addExeExt(name), { nothrow: true })
  if (whichDir !== null) {
    return dirname(whichDir)
  }

  return dirs[dirs.length - 1]
}
