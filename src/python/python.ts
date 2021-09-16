import * as core from "@actions/core"
import * as finder from "./setup-python/src/find-python"
import * as finderPyPy from "./setup-python/src/find-pypy"
import * as path from "path"

function isPyPyVersion(versionSpec: string) {
  return versionSpec.startsWith("pypy-")
}

export async function setupPython(version: string, _setupCppDir: string, arch: string) {
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
    const matchersPath = path.join(__dirname, "..", ".github")
    core.info(`##[add-matcher]${path.join(matchersPath, "python.json")}`)
  } catch (err) {
    core.setFailed((err as Error).message)
  }
}
