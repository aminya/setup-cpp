import { Inputs, Opts } from "../main"
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
  const newest = parseInt(Object.keys(DefaultLinuxVersion[name])[0], 10) // newest version with the default
  if (osVersionMaj >= newest) {
    return DefaultLinuxVersion[name][osVersionMaj]
  } else {
    return ""
  }
}

export function isDefault(version: string | undefined, name: string) {
  return version === "true" || (version === undefined && name in DefaultVersions)
}

export function syncVersions(opts: Opts, tools: Inputs[]): boolean {
  const toolsInUse = tools.filter((tool) => opts[tool] !== undefined)
  const toolsNonDefaultVersion = toolsInUse.filter((tool) => !isDefault(opts[tool], tool))

  const targetVersion = toolsNonDefaultVersion.length ? opts[toolsNonDefaultVersion[0]] : "true"

  // return false if any explicit versions don't match the target version
  if (toolsNonDefaultVersion.findIndex((tool) => opts[tool] !== targetVersion) !== -1) {
    return false
  }

  toolsInUse.forEach((tool) => (opts[tool] = targetVersion))
  return true
}
