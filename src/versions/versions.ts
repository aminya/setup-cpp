import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import memoize from "memoizee"
import { isAlpine } from "setup-alpine"
import { hasAptGet } from "setup-apt"
import type { CompilerInfo } from "../compilers.js"
import type { Opts } from "../options.js"
import type { Inputs, ToolName } from "../tool.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"

export function getVersion(name: ToolName, version: string | undefined, distroVersion: number[] | null = null) {
  if (isVersionDefault(version)) {
    return getVersionDefault(name, distroVersion) ?? ""
  }

  return version
}

type ArchVersionMap = Record<NodeJS.Architecture | "else", string | undefined>
type DistroVersionMap = Record<
  `${number}` | `${number}.${number}` | `${number}.${number}.${number}` | string | "else",
  ArchVersionMap | string | undefined
>
type DistroMap = Record<
  "ubuntu" | "archlinux" | "alpine" | "fedora" | string | "else",
  DistroVersionMap | string | undefined
>
type PlatformMap = Record<NodeJS.Platform | "else", DistroMap | string | undefined>
type Versions = Record<ToolName | "pip", PlatformMap | string | undefined>

function readVersions_(): Versions {
  const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

  const jsonPath = path.join(dirname, "versions.json")
  return JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as Versions
}
const readVersions = memoize(readVersions_)

/** Get the default version if passed true or undefined, otherwise return the version itself */
export function getVersionDefault(
  tool: ToolName | "pip",
  distroVersion: number[] | null = null,
): string | undefined {
  // get the tool
  const versions = readVersions()
  const platformMapOrVersion = versions[tool]
  if (platformMapOrVersion === undefined) {
    return undefined // no default version for this tool
  }
  // platform-independent versions
  if (typeof platformMapOrVersion === "string") {
    return platformMapOrVersion
  }
  const platformMap = platformMapOrVersion

  // Check for platform-specific versions
  const distroMapOrVersion = platformMap[process.platform] ?? platformMap.else
  if (distroMapOrVersion === undefined) {
    throw new Error(`Platform "${process.platform}" not found in versions data for tool "${tool}"`)
  }
  // distro-independent versions
  if (typeof distroMapOrVersion === "string") {
    return distroMapOrVersion
  }
  const distroMap = distroMapOrVersion

  // check for distro-specific versions
  const distro = hasAptGet()
    ? "ubuntu"
    : isArch()
    ? "archlinux"
    : isAlpine()
    ? "alpine"
    : hasDnf()
    ? "fedora"
    : "else"
  const distroVersionMapOrVersion = distroMap[distro] ?? distroMap.else
  if (distroVersionMapOrVersion === undefined) {
    throw new Error(`Distro "${distro}" not found in versions data for tool "${tool}"`)
  }

  // distro version independent versions
  if (typeof distroVersionMapOrVersion === "string") {
    return distroVersionMapOrVersion
  }
  const distroVersionMap = distroVersionMapOrVersion

  // check for the distro-specific version for the current architecture
  const archVersionMapOrVersion = distroVersion !== null
    ? matchDistroVersion(distroVersion, distroVersionMap)
    : distroVersionMap.else
  if (archVersionMapOrVersion === undefined) {
    throw new Error(`Architecture "${process.arch}" not found in versions data for tool "${tool}"`)
  }
  if (typeof archVersionMapOrVersion === "string") {
    return archVersionMapOrVersion
  }
  const archVersionMap = archVersionMapOrVersion

  // get the version for the current architecture
  return archVersionMap[process.arch] ?? archVersionMap.else
}

/// choose the default linux version based on ubuntu version
function matchDistroVersion(distroVersion: number[], distroVersionMap: DistroVersionMap) {
  const distroVersionMaj = distroVersion[0]

  // find which version block the os version is in
  const satisfyingVersion = Object.keys(distroVersionMap)
    .map((v) => Number.parseInt(v, 10))
    .filter((v) => !Number.isNaN(v))
    .sort((a, b) => b - a) // sort in descending order
    .find((v) => distroVersionMaj >= v)

  return satisfyingVersion !== undefined
    ? distroVersionMap[satisfyingVersion]
      ?? distroVersionMap.else
    : distroVersionMap.else
}

function isVersionDefault(version: string | undefined) {
  return version === "true" || version === undefined
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
export function syncVersions(
  opts: Opts,
  toolsGiven: Inputs[],
  compilerInfo: CompilerInfo | undefined = undefined,
): boolean {
  // check if compiler version should be synced
  const syncCompiler = compilerInfo === undefined ? false : toolsGiven.includes(compilerInfo.compiler as Inputs)

  // remove the compiler from the tools if it should not be synced
  const tools = syncCompiler ? toolsGiven : toolsGiven.filter((tool) => tool !== "compiler")

  // filter out the tools that are in use in the options
  const toolsInUse = tools.filter((tool) => opts[tool] !== undefined)

  // filter out the tools that are not default
  const toolsNonDefaultVersion = toolsInUse.filter((tool) => {
    const version = (syncCompiler && tool === "compiler" && compilerInfo !== undefined)
      ? compilerInfo.version
      : opts[tool]
    return !isVersionDefault(version)
  })

  // find the target version to sync to
  const targetVersion: string = (toolsNonDefaultVersion.length !== 0)
    ? (syncCompiler && toolsNonDefaultVersion[0] === "compiler" && compilerInfo !== undefined)
      ? compilerInfo.version ?? "true"
      : opts[toolsNonDefaultVersion[0]] ?? "true"
    : "true"

  // error if any explicit versions don't match the target version
  if (
    toolsNonDefaultVersion.some((tool) => {
      if (syncCompiler && tool === "compiler" && compilerInfo !== undefined) {
        return opts.compiler !== `${compilerInfo.compiler}-${targetVersion}`
      }

      return opts[tool] !== targetVersion
    })
  ) {
    return false
  }

  // update the version of all the tools to the target version
  for (const tool of toolsInUse) {
    opts[tool] = (syncCompiler && tool === "compiler" && compilerInfo !== undefined)
      ? `${compilerInfo.compiler}-${targetVersion}`
      : targetVersion
  }

  return true
}

export function isMinVersion(version: string) {
  return version.startsWith(">")
}
