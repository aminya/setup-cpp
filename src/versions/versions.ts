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
  for (let i = 0; i < tools.length; i++) {
    // tools excluding i_tool
    const otherTools = tools.slice(0, i).concat(tools.slice(i + 1))

    const tool = tools[i]

    if (!isDefault(opts[tool], tool)) {
      for (let i_other = 0; i_other < otherTools.length; i_other++) {
        const otherTool = otherTools[i_other]
        const useDefaultOtherTool = isDefault(opts[otherTool], otherTools[i_other])
        if (useDefaultOtherTool) {
          // use the same version if the other tool was requested with the default
          opts[otherTool] = opts[tool]
        } else if (opts[tool] !== opts[otherTools[i_other]]) {
          // error if different from the other given versions
          return false
        }
      }
    }
  }
  return true
}
