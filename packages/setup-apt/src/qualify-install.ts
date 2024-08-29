import { warning } from "ci-log"
import escapeRegex from "escape-string-regexp"
import { execa } from "execa"
import { getAptEnv } from "./apt-env.js"
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
export async function filterAndQualifyAptPackages(apt: string, packages: AptPackage[]) {
  return (await Promise.all(packages.map((pack) => qualifiedNeededAptPackage(apt, pack))))
    .filter((pack) => pack !== undefined)
}

async function qualifiedNeededAptPackage(apt: string, pack: AptPackage) {
  // Qualify the packages into full package name/version
  const qualified = await getAptArg(apt, pack.name, pack.version)
  // filter out the packages that are already installed
  return (await isAptPackInstalled(qualified)) ? undefined : qualified
}

async function aptPackageType(apt: string, name: string, version: string | undefined): Promise<AptPackageType> {
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
    return aptPackageType(apt, name, version)
  }

  return AptPackageType.None
}

async function getAptArg(apt: string, name: string, version: string | undefined) {
  const package_type = await aptPackageType(apt, name, version)
  switch (package_type) {
    case AptPackageType.NameDashVersion:
      return `${name}-${version}`
    case AptPackageType.NameEqualsVersion:
      return `${name}=${version}`
    case AptPackageType.Name:
      if (version !== undefined && version !== "") {
        warning(`Could not find package ${name} with version ${version}. Installing the latest version.`)
      }
      return name
    default:
      throw new Error(`Could not find package ${name} ${version ?? ""}`)
  }
}
