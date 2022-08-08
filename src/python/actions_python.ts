import { useCpythonVersion } from "setup-python/src/find-python"
import { findPyPyVersion } from "setup-python/src/find-pypy"
import { existsSync } from "fs"
import { info, warning } from "../utils/io/io"
import { debug } from "@actions/core"
import path from "path"
import ciDetect from "@npmcli/ci-detect"
import { isCacheFeatureAvailable, IS_LINUX, IS_WINDOWS } from "setup-python/src/utils"
import { getCacheDistributor } from "setup-python/src/cache-distributions/cache-factory"

function isPyPyVersion(versionSpec: string) {
  return versionSpec.startsWith("pypy")
}

/*
function resolveVersionInput(version: string): string {
  let versionFile = getInput("python-version-file")

  if (version && versionFile) {
    warning("Both python-version and python-version-file inputs are specified, only python-version will be used")
  }

  if (version) {
    return version
  }

  versionFile = versionFile || ".python-version"
  if (!existsSync(versionFile)) {
    throw new Error(`The specified python version file at: ${versionFile} does not exist`)
  }
  version = readFileSync(versionFile, "utf8")
  info(`Resolved ${versionFile} as ${version}`)

  return version
}
*/

export async function cacheDependencies(cache: string, pythonVersion: string) {
  const cacheDependencyPath = undefined // core.getInput("cache-dependency-path") || undefined
  const cacheDistributor = getCacheDistributor(cache, pythonVersion, cacheDependencyPath)
  await cacheDistributor.restoreCache()
}

export async function setupActionsPython(version: string, _setupDir: string, arch: string) {
  // According to the README windows binaries do not require to be installed
  // in the specific location, but Mac and Linux do
  if (!IS_WINDOWS && !process.env.AGENT_TOOLSDIRECTORY?.trim()) {
    if (IS_LINUX) {
      process.env.AGENT_TOOLSDIRECTORY = "/opt/hostedtoolcache"
    } else {
      process.env.AGENT_TOOLSDIRECTORY = "/Users/runner/hostedtoolcache"
    }
    process.env.RUNNER_TOOL_CACHE = process.env.AGENT_TOOLSDIRECTORY
  }
  debug(`Python is expected to be installed into RUNNER_TOOL_CACHE=${process.env.RUNNER_TOOL_CACHE}`)
  // const version = resolveVersionInput(versionGiven)
  if (version) {
    let pythonVersion: string
    if (isPyPyVersion(version)) {
      const installed = await findPyPyVersion(version, arch, true)
      pythonVersion = `${installed.resolvedPyPyVersion}-${installed.resolvedPythonVersion}`
      info(`Successfully set up PyPy ${installed.resolvedPyPyVersion} with Python (${installed.resolvedPythonVersion})`)
    } else {
      const installed = await useCpythonVersion(version, arch, true)
      pythonVersion = installed.version
      info(`Successfully set up ${installed.impl} (${pythonVersion})`)
    }

    if (isCacheFeatureAvailable()) {
      const cache = "pip" // core.getInput("cache") // package manager used for caching
      await cacheDependencies(cache, pythonVersion)
    }
  }

  if (ciDetect() === "github") {
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
