import path, { join } from "path"
import { fileURLToPath } from "url"
import { debug } from "@actions/core"
import ciInfo from "ci-info"
const { GITHUB_ACTIONS } = ciInfo
import { info, warning } from "ci-log"
import { pathExists } from "path-exists"
import { findPyPyVersion } from "setup-python/src/find-pypy.js"
import { useCpythonVersion } from "setup-python/src/find-python.js"
import { IS_MAC } from "setup-python/src/utils.js"

const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

function isPyPyVersion(versionSpec: string) {
  return versionSpec.startsWith("pypy")
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
      const installed = await findPyPyVersion(version, arch, true, checkLatest, false)
      pythonVersion = `${installed.resolvedPyPyVersion}-${installed.resolvedPythonVersion}`
      info(`Successfully set up PyPy ${installed.resolvedPyPyVersion} with Python (${installed.resolvedPythonVersion})`)
    } else {
      const installed = await useCpythonVersion(version, arch, true, checkLatest, false)
      pythonVersion = installed.version
      info(`Successfully set up ${installed.impl} (${pythonVersion})`)
    }

    // const cache = false
    // if (cache) {
    //   const { cacheDependencies } = await import("setup-python/src/cache-dependencies")
    //   await cacheDependencies("pip", pythonVersion)
    // }
  }

  if (GITHUB_ACTIONS) {
    await addPythonLoggingMatcher()
  }

  return undefined
}

async function addPythonLoggingMatcher() {
  const matcherPath = join(dirname, "python_matcher.json")
  if (!(await pathExists(matcherPath))) {
    return warning("the python_matcher.json file does not exist in the same folder as setup-cpp.js")
  }
  info(`::add-matcher::${matcherPath}`)
}
