import { useCpythonVersion } from "setup-python/src/find-python"
import { findPyPyVersion } from "setup-python/src/find-pypy"
import { existsSync } from "fs"
import { info, warning } from "../utils/io/io"
import { debug } from "@actions/core"
import path from "path"
import { isGitHubCI } from "../utils/env/isci"
import { cacheDependencies } from "./actions_cache"

function isPyPyVersion(versionSpec: string) {
  return versionSpec.startsWith("pypy")
}

// function resolveVersionInput(version: string): string {
//   let versionFile = getInput("python-version-file")

//   if (version && versionFile) {
//     warning("Both python-version and python-version-file inputs are specified, only python-version will be used")
//   }

//   if (version) {
//     return version
//   }

//   versionFile = versionFile || ".python-version"
//   if (!existsSync(versionFile)) {
//     throw new Error(`The specified python version file at: ${versionFile} does not exist`)
//   }
//   version = readFileSync(versionFile, "utf8")
//   info(`Resolved ${versionFile} as ${version}`)

//   return version
// }

export async function setupActionsPython(version: string, _setupDir: string, arch: string) {
  if (process.env.AGENT_TOOLSDIRECTORY?.trim()) {
    debug(`Python is expected to be installed into AGENT_TOOLSDIRECTORY=${process.env["AGENT_TOOLSDIRECTORY"]}`)
    process.env["RUNNER_TOOL_CACHE"] = process.env["AGENT_TOOLSDIRECTORY"]
  } else {
    debug(`Python is expected to be installed into RUNNER_TOOL_CACHE==${process.env["RUNNER_TOOL_CACHE"]}`)
  }
  // const version = resolveVersionInput(versionGiven)
  if (version) {
    let pythonVersion: string
    if (isPyPyVersion(version)) {
      const installed = await findPyPyVersion(version, arch)
      pythonVersion = `${installed.resolvedPyPyVersion}-${installed.resolvedPythonVersion}`
      info(`Successfully set up PyPy ${installed.resolvedPyPyVersion} with Python (${installed.resolvedPythonVersion})`)
    } else {
      const installed = await useCpythonVersion(version, arch)
      pythonVersion = installed.version
      info(`Successfully set up ${installed.impl} (${pythonVersion})`)
    }

    const cache = "pip" // core.getInput("cache") // package manager used for caching

    await cacheDependencies(cache, pythonVersion)
  }

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
