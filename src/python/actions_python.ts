import * as core from "@actions/core"
import * as finder from "setup-python/src/find-python"
import * as finderPyPy from "setup-python/src/find-pypy"
// import * as path from "path"

function isPyPyVersion(versionSpec: string) {
  return versionSpec.startsWith("pypy-")
}

export async function setupActionsPython(version: string, _setupDir: string, arch: string) {
  if (isPyPyVersion(version)) {
    const installed = await finderPyPy.findPyPyVersion(version, arch)
    core.info(
      `Successfully setup PyPy ${installed.resolvedPyPyVersion} with Python (${installed.resolvedPythonVersion})`
    )
  } else {
    const installed = await finder.findPythonVersion(version, arch)
    core.info(`Successfully setup ${installed.impl} (${installed.version})`)
  }
  // fails
  // core.info(`##[add-matcher]${path.join("./.github", "python.json")}`)
  return undefined
}
