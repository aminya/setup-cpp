import type { Opts } from "../cli-options.js"
import type { CompilerInfo } from "../compilers.js"
import type { Inputs } from "../tool.js"
import { DefaultUbuntuVersion, DefaultVersions } from "./default_versions.js"

/** Get the default version if passed true or undefined, otherwise return the version itself */
export function getVersion(name: string, version: string | undefined, osVersion: number[] | null = null) {
  if (isVersionDefault(version) && process.platform === "linux" && osVersion !== null && name in DefaultUbuntuVersion) {
    return getDefaultLinuxVersion(osVersion, DefaultUbuntuVersion[name]!)
  } else if (isVersionDefault(version) && name in DefaultVersions) {
    return DefaultVersions[name] ?? ""
  } else if (version === "true") {
    return ""
  }
  return version ?? ""
}

function isVersionDefault(version: string | undefined) {
  return version === "true" || version === undefined
}

/// choose the default linux version based on ubuntu version
function getDefaultLinuxVersion(osVersion: number[], toolLinuxVersions: Record<number, string>) {
  const osVersionMaj = osVersion[0]

  // find which version block the os version is in
  const satisfyingVersion = Object.keys(toolLinuxVersions)
    .map((v) => Number.parseInt(v, 10))
    .sort((a, b) => b - a) // sort in descending order
    .find((v) => osVersionMaj >= v)

  return satisfyingVersion === undefined ? "" : toolLinuxVersions[satisfyingVersion]
}

/**
 * Sync the versions for the given inputs
 *
 * It modifies the opts object to have the same version for all the tools
 * If the return is false, it means that versions don't match the target version
 * @param opts - The options object (modified in place)
 * @param tools - The tools to sync the versions for (it can include `compiler`)
 * @param compilerInfo - The compiler info to sync the versions for (if any)
 */
export function syncVersions(opts: Opts, tools: Inputs[], compilerInfo: CompilerInfo | undefined = undefined): boolean {
  // filter out the tools that are in use in the options
  const toolsInUse = tools.filter((tool) => opts[tool] !== undefined)

  // filter out the tools that are not default
  const toolsNonDefaultVersion = toolsInUse.filter((tool) => {
    const version = (tool === "compiler" && compilerInfo !== undefined)
      ? compilerInfo.version
      : opts[tool]
    return !isVersionDefault(version)
  })

  // find the target version to sync to
  const targetVersion: string = (toolsNonDefaultVersion.length !== 0)
    ? (toolsNonDefaultVersion[0] === "compiler" && compilerInfo !== undefined)
      ? compilerInfo.version ?? "true"
      : opts[toolsNonDefaultVersion[0]] ?? "true"
    : "true"

  // error if any explicit versions don't match the target version
  if (
    toolsNonDefaultVersion.some((tool) => {
      if (tool === "compiler" && compilerInfo !== undefined) {
        return opts.compiler !== `${compilerInfo.compiler}-${targetVersion}`
      }

      return opts[tool] !== targetVersion
    })
  ) {
    return false
  }

  // update the version of all the tools to the target version
  for (const tool of toolsInUse) {
    opts[tool] = (tool === "compiler" && compilerInfo !== undefined)
      ? `${compilerInfo.compiler}-${targetVersion}`
      : targetVersion
  }

  return true
}
