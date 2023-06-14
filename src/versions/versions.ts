import { Opts } from "../cli-options"
import { Inputs } from "../tool"
import { DefaultLinuxVersion, DefaultVersions } from "./default_versions"

/** Get the default version if passed true or undefined, otherwise return the version itself */
export function getVersion(name: string, version: string | undefined, osVersion: number[] | null = null) {
  if (isDefault(version, name)) {
    if (process.platform === "linux" && osVersion !== null && name in DefaultLinuxVersion) {
      return getDefaultLinuxVersion(name, osVersion)
    }
    // anything else
    return DefaultVersions[name]
  } else {
    return version ?? ""
  }
}

/// choose the default linux version based on ubuntu version
function getDefaultLinuxVersion(name: string, osVersion: number[]) {
  const osVersionMaj = osVersion[0]

  // find which version block the os version is in
  const satisfyingVersion = Object.keys(DefaultLinuxVersion[name])
    .map((v) => parseInt(v, 10))
    .sort((a, b) => b - a) // sort in descending order
    .find((v) => osVersionMaj >= v)

  return satisfyingVersion === undefined ? "" : DefaultLinuxVersion[name][satisfyingVersion]
}

export function isDefault(version: string | undefined, name: string) {
  return version === "true" || (version === undefined && name in DefaultVersions)
}

/**
 * Sync the versions for the given inputs
 *
 * If the return is false, it means that versions don't match the target version
 */
export function syncVersions(opts: Opts, tools: Inputs[]): boolean {
  const toolsInUse = tools.filter((tool) => opts[tool] !== undefined)
  const toolsNonDefaultVersion = toolsInUse.filter((tool) => !isDefault(opts[tool], tool))

  const targetVersion = toolsNonDefaultVersion.length >= 1 ? opts[toolsNonDefaultVersion[0]] : "true"

  if (toolsNonDefaultVersion.some((tool) => opts[tool] !== targetVersion)) {
    // error if any explicit versions don't match the target version
    return false
  }

  toolsInUse.forEach((tool) => {
    opts[tool] = targetVersion
  })

  return true
}
