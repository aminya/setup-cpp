import { info } from "@actions/core"
import { execaSync } from "execa"
import { pathExists } from "path-exists"
import { addExeExt, dirname, join } from "patha"
import which from "which"
import { addPythonBaseExecPrefix, setupPython } from "../../python/python"
import { addPath } from "../env/addEnv"
import { InstallationInfo } from "./setupBin"
import { getVersion } from "../../versions/versions"
import { ubuntuVersion } from "../env/ubuntu_version"
import memoize from "micro-memoize"

/** A function that installs a package using pip */
export async function setupPipPack(name: string, version?: string, upgrade = false): Promise<InstallationInfo> {
  return setupPipPackWithPython(await getPython(), name, version, upgrade)
}

export async function setupPipPackWithPython(
  givenPython: string,
  name: string,
  version?: string,
  upgrade = false
): Promise<InstallationInfo> {
  info(`Installing ${name} ${version ?? ""} via pip`)

  const nameAndVersion = version !== undefined && version !== "" ? `${name}==${version}` : name
  const upgradeFlag = upgrade === true ? ["--upgrade"] : []

  execaSync(givenPython, ["-m", "pip", "install", ...upgradeFlag, nameAndVersion], {
    stdio: "inherit",
  })

  const execPaths = await addPythonBaseExecPrefix(givenPython)
  const binDir = await findBinDir(execPaths, name)

  await addPath(binDir)

  return { binDir }
}

async function getPython_raw(): Promise<string> {
  const pythonBin = (await setupPython(getVersion("python", undefined, await ubuntuVersion()), "", process.arch)).bin
  if (pythonBin === undefined) {
    throw new Error("Python binary was not found")
  }
  return pythonBin
}
const getPython = memoize(getPython_raw)

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
