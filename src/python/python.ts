import * as core from "@actions/core"
import * as finder from "./setup-python/src/find-python"
import * as finderPyPy from "./setup-python/src/find-pypy"
import * as path from "path"
import { addPath } from "../utils/path/addPath"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import hasha from "hasha"
import { join } from "path"
import { isCI } from "../utils/env/isci"

function isPyPyVersion(versionSpec: string) {
  return versionSpec.startsWith("pypy-")
}

export async function setupPython(version: string, setupCppDir: string, arch: string) {
  if (!isCI()) {
    // TODO parse versoin
    return setupPythonViaSystem("", setupCppDir, arch)
  }

  try {
    if (isPyPyVersion(version)) {
      const installed = await finderPyPy.findPyPyVersion(version, arch)
      core.info(
        `Successfully setup PyPy ${installed.resolvedPyPyVersion} with Python (${installed.resolvedPythonVersion})`
      )
    } else {
      const installed = await finder.findPythonVersion(version, arch)
      core.info(`Successfully setup ${installed.impl} (${installed.version})`)
    }
    const matchersPath = path.join("setup-pthon", ".github")
    core.info(`##[add-matcher]${path.join(matchersPath, "python.json")}`)
    return undefined
  } catch (err) {
    return setupPythonViaSystem(version, setupCppDir, arch)
  }
}

export async function setupPythonViaSystem(version: string, setupCppDir: string, arch: string) {
  switch (process.platform) {
    case "win32": {
      // Get an unique output directory name from the URL.
      const key: string = await hasha.async(version + arch, { algorithm: "md5" })
      const installDir = join(setupCppDir, key, "python")
      const binDir = installDir
      await setupChocoPack("python3", version, [`/InstallDir:${installDir}`])

      // Adding the bin dir to the path
      /** The directory which the tool is installed to */
      core.info(`Add ${binDir} to PATH`)
      addPath(binDir)

      return { installDir, binDir }
    }
    case "darwin": {
      return setupBrewPack("python3", version)
    }
    case "linux": {
      const installInfo = await setupAptPack("python3", version)
      await setupAptPack("python3-pip")
      return installInfo
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
