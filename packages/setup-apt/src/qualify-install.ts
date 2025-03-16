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
  if (version !== undefined && version !== "") {
    const { stdout } = await execa("apt-cache", [
      "search",
      "--names-only",
      `^${escapeRegex(name)}-${escapeRegex(version)}$`,
    ], { env: getAptEnv(apt), stdio: "pipe" })
    if (stdout.trim() !== "") {
      return AptPackageType.NameDashVersion
    }

    try {
      // check if apt-get show can find the version
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { stdout } = await execa("apt-cache", ["show", `${name}=${version}`], { env: getAptEnv(apt) })
      if (stdout.trim() === "") {
        return AptPackageType.NameEqualsVersion
      }
    } catch {
      // ignore
    }
  }

  try {
    const { stdout: showStdout } = await execa("apt-cache", ["show", name], { env: getAptEnv(apt), stdio: "pipe" })
    if (showStdout.trim() !== "") {
      return AptPackageType.Name
    }
  } catch {
    // ignore
  }

  // If apt-cache fails, update the repos and try again
  if (!updatedRepos) {
    updateAptReposMemoized(apt)
    return aptPackageType(apt, name, version, fallBackToLatest)
  }

  if (version === undefined || version === "" || fallBackToLatest) {
    // if the version is undefined or empty, return the name as a package name
    return AptPackageType.Name
  }

  return AptPackageType.None
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
