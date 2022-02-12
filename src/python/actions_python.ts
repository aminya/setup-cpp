import * as finder from "setup-python/src/find-python"
import * as finderPyPy from "setup-python/src/find-pypy"
import { existsSync } from "fs"
import { warning } from "../utils/io/io"
import { info } from "@actions/core"
import path from "path"
import { isGitHubCI } from "../utils/env/isci"
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
    info(`Successfully setup PyPy ${installed.resolvedPyPyVersion} with Python (${installed.resolvedPythonVersion})`)
  } else {
    const installed = await finder.findPythonVersion(version, arch)
    pythonVersion = installed.version
    info(`Successfully setup ${installed.impl} (${pythonVersion})`)
  }

  // const cache = core.getInput("cache")
  // if (cache) {
  //   await cacheDependencies(cache, pythonVersion)
  // }

  if (isGitHubCI()) {
    addPythonLoggingMatcher()
  }

  return undefined
}

function addPythonLoggingMatcher() {
  const matcherPath = path.join(__dirname, "python_matcher.json")
  if (!existsSync(matcherPath)) {
    return warning("the python_matcher.json file does not exist in the same folder as setup_cpp.js")
  }
  info(`::add-matcher::${matcherPath}`)
}
