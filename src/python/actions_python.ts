import * as core from "@actions/core"
import * as finder from "setup-python/src/find-python"
import * as finderPyPy from "setup-python/src/find-pypy"
// import { getCacheDistributor } from "setup-python/src/cache-distributions/cache-factory"
// import { isGhes } from "setup-python/src/utils"

function isPyPyVersion(versionSpec: string) {
  return versionSpec.startsWith("pypy-")
}

// // @ts-ignore
// async function cacheDependencies(cache: string, pythonVersion: string) {
//   if (isGhes()) {
//     throw new Error("Caching is not supported on GHES")
//   }
//   const cacheDependencyPath = core.getInput("cache-dependency-path") || undefined
//   const cacheDistributor = getCacheDistributor(cache, pythonVersion, cacheDependencyPath)
//   await cacheDistributor.restoreCache()
// }

export async function setupActionsPython(version: string, _setupDir: string, arch: string) {
  let pythonVersion: string
  if (isPyPyVersion(version)) {
    const installed = await finderPyPy.findPyPyVersion(version, arch)
    pythonVersion = `${installed.resolvedPyPyVersion}-${installed.resolvedPythonVersion}`
    core.info(
      `Successfully setup PyPy ${installed.resolvedPyPyVersion} with Python (${installed.resolvedPythonVersion})`
    )
  } else {
    const installed = await finder.findPythonVersion(version, arch)
    pythonVersion = installed.version
    core.info(`Successfully setup ${installed.impl} (${pythonVersion})`)
  }

  // const cache = core.getInput("cache")
  // if (cache) {
  //   await cacheDependencies(cache, pythonVersion)
  // }

  // fails
  // const matchersPath = path.join(__dirname, '../..', '.github');
  // core.info(`##[add-matcher]${path.join(matchersPath, 'python.json')}`);
  // core.info(`##[add-matcher]${path.join("./.github", "python.json")}`)

  return undefined
}
