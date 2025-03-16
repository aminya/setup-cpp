import { info } from "ci-log"
import escapeRegex from "escape-string-regexp"
import { execa } from "execa"
import { getAptEnv } from "./apt-env.js"
import { getApt } from "./get-apt.js"
import type { AptPackage } from "./install.js"
import { isAptPackInstalled } from "./is-installed.js"
import { updateAptReposMemoized, updatedRepos } from "./update.js"

/**
 * The type of apt package to install
 */
export enum AptPackageType {
  NameDashVersion = 0,
  NameEqualsVersion = 1,
  Name = 2,
  None = 3,
}

/**
 * Filter out the packages that are already installed and qualify the packages into a full package name/version
 */
export async function filterAndQualifyAptPackages(packages: AptPackage[], apt: string = getApt()) {
  return (await Promise.all(packages.map((pack) => qualifiedNeededAptPackage(pack, apt))))
    .filter((pack) => pack !== undefined)
}

/**
 * Qualify the package into full package name/version.
 * If the package is not installed, return the full package name/version.
 * If the package is already installed, return undefined
 */
export async function qualifiedNeededAptPackage(pack: AptPackage, apt: string = getApt()) {
  // Qualify the package into full package name/version
  const qualified = await getAptArg(apt, pack)
  // filter out the package that are already installed
  return (await isAptPackInstalled(qualified)) ? undefined : qualified
}

async function aptPackageType(
  apt: string,
  name: string,
  version: string | undefined,
  fallBackToLatest: boolean,
): Promise<AptPackageType> {
  const hasVersion = version !== undefined && version !== ""
  const canFallBackToLatest = !hasVersion || fallBackToLatest

  if (hasVersion) {
    // check if apt-get search can find the version
    if (await aptCacheSearchHasPackage(apt, name, version)) {
      return AptPackageType.NameDashVersion
    }

    // check if apt-get show can find the version
    if (await aptCacheShowHasPackage(apt, `${name}=${version}`)) {
      return AptPackageType.NameEqualsVersion
    }
  }

  const logFallback = () => {
    if (hasVersion && fallBackToLatest) {
      info(`Could not find package ${name} ${version}. Falling back to latest version.`)
    }
  }

  if (canFallBackToLatest && await aptCacheShowHasPackage(apt, name)) {
    // if the version is undefined or empty, return the name as a package name
    logFallback()
    return AptPackageType.Name
  }

  // If apt-cache fails, update the repos and try again
  if (!updatedRepos) {
    updateAptReposMemoized(apt)
    return aptPackageType(apt, name, version, fallBackToLatest)
  }

  if (canFallBackToLatest) {
    // if the version is undefined or empty, return the name as a package name
    logFallback()
    return AptPackageType.Name
  }

  return AptPackageType.None
}

async function aptCacheSearchHasPackage(apt: string, name: string, version: string) {
  try {
    const { stdout } = await execa("apt-cache", [
      "search",
      "--names-only",
      `^${escapeRegex(name)}-${escapeRegex(version)}$`,
    ], { env: getAptEnv(apt), stdio: "pipe" })
    if (stdout.trim() !== "") {
      return true
    }
  } catch {
    // ignore
  }
  return false
}

async function aptCacheShowHasPackage(apt: string, arg: string) {
  try {
    const { stdout } = await execa("apt-cache", ["show", arg], {
      env: getAptEnv(apt),
      stdio: "pipe",
      verbose: true,
    })
    if (stdout.trim() !== "") {
      return true
    }
  } catch {
    // ignore
  }
  return false
}

async function getAptArg(apt: string, pack: AptPackage) {
  const { name, version, fallBackToLatest = false } = pack

  const package_type = await aptPackageType(apt, name, version, fallBackToLatest)
  switch (package_type) {
    case AptPackageType.NameDashVersion:
      return `${name}-${version}`
    case AptPackageType.NameEqualsVersion:
      return `${name}=${version}`
    case AptPackageType.Name: {
      return name
    }
    default:
      throw new Error(`Could not find package '${name}' ${version ?? "with unspecified version"}`)
  }
}
