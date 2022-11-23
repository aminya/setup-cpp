import { useCpythonVersion } from "setup-python/src/find-python"
import { findPyPyVersion } from "setup-python/src/find-pypy"

import { info, warning } from "ci-log"
import { debug } from "@actions/core"
import { join } from "patha"
import ciDetect from "@npmcli/ci-detect"
import { isCacheFeatureAvailable, IS_MAC } from "setup-python/src/utils"
import { getCacheDistributor } from "setup-python/src/cache-distributions/cache-factory"
import pathExists from "path-exists"

function isPyPyVersion(versionSpec: string) {
  return versionSpec.startsWith("pypy")
}

export async function cacheDependencies(cache: string, pythonVersion: string) {
  const cacheDependencyPath = undefined
  const cacheDistributor = getCacheDistributor(cache, pythonVersion, cacheDependencyPath)
  await cacheDistributor.restoreCache()
}

const checkLatest = false

export async function setupActionsPython(version: string, _setupDir: string, arch: string) {
  if (IS_MAC) {
    process.env.AGENT_TOOLSDIRECTORY = "/Users/runner/hostedtoolcache"
  }

  const agent_toolsdirectory = process.env.AGENT_TOOLSDIRECTORY?.trim()
  if (typeof agent_toolsdirectory === "string" && agent_toolsdirectory !== "") {
    process.env.RUNNER_TOOL_CACHE = process.env.AGENT_TOOLSDIRECTORY
  }

  debug(`Python is expected to be installed into ${process.env.RUNNER_TOOL_CACHE}`)

  if (version) {
    let pythonVersion: string
    if (isPyPyVersion(version)) {
      const installed = await findPyPyVersion(version, arch, true, checkLatest)
      pythonVersion = `${installed.resolvedPyPyVersion}-${installed.resolvedPythonVersion}`
      info(`Successfully set up PyPy ${installed.resolvedPyPyVersion} with Python (${installed.resolvedPythonVersion})`)
    } else {
      const installed = await useCpythonVersion(version, arch, true, checkLatest)
      pythonVersion = installed.version
      info(`Successfully set up ${installed.impl} (${pythonVersion})`)
    }

    if (isCacheFeatureAvailable()) {
      const cache = "pip" // package manager used for caching
      await cacheDependencies(cache, pythonVersion)
    }
  }

  if (ciDetect() === "github-actions") {
    await addPythonLoggingMatcher()
  }

  return undefined
}

async function addPythonLoggingMatcher() {
  const matcherPath = join(__dirname, "python_matcher.json")
  if (!(await pathExists(matcherPath))) {
    return warning("the python_matcher.json file does not exist in the same folder as setup_cpp.js")
  }
  info(`::add-matcher::${matcherPath}`)
}
