import escapeRegex from "escape-string-regexp"
import { execa } from "execa"
import { getAptEnv } from "./apt-env.js"
import { getApt } from "./get-apt.js"
import type { AptPackage } from "./install.js"
import { isAptPackInstalled } from "./is-installed.js"
import { updateAptReposMemoized, updatedRepos } from "./update.js"

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
  const info = await findAptPackageInfo(pack.name, pack.version, apt)
  if (info === undefined) {
    throw new Error(`Could not find package ${pack.name} ${pack.version}`)
  }

  // filter out the package that are already installed
  return (await isAptPackInstalled(info.qualified)) ? undefined : info
}

export type AptPackageInfo = {
  name: string
  version: string
  qualified: string
}

/**
 * Get the version of the package from apt-cache show
 * If the version is not found, check if apt-cache search can find the version
 * If the version is still not found, update the repos and try again
 */
export async function findAptPackageInfo(
  name: string,
  version: string | undefined,
  apt: string = getApt(),
): Promise<AptPackageInfo | undefined> {
  const info = await aptCacheShow(name, version, apt)
  if (info !== undefined) {
    return info
  }

  if (version !== undefined) {
    // check if apt-cache search can find the version
    const { stdout } = await execa("apt-cache", [
      "search",
      "--names-only",
      `^${escapeRegex(name)}-${escapeRegex(version)}$`,
    ], { env: getAptEnv(apt), stdio: "pipe" })

    const stdOutTrim = (stdout as string).trim()

    if (stdOutTrim !== "") {
      // get the package name by splitting the first line by " - "
      const packages = stdOutTrim.split("\n")
      const actualName = packages[0].split(" - ")[0]

      // get the version from apt-cache show
      return aptCacheShow(actualName, undefined, apt)
    }
  }

  // If apt-cache fails, update the repos and try again
  if (!updatedRepos) {
    updateAptReposMemoized(apt)
    return findAptPackageInfo(apt, name, version)
  }

  return undefined
}

/**
 * Get the info about a package from apt-cache show
 *
 * @param name The name of the package
 * @param version The version of the package
 * @param apt The apt command to use
 *
 * @returns The package info or undefined if the package is not found
 */
export async function aptCacheShow(
  name: string,
  version: string | undefined,
  apt: string = getApt(),
): Promise<AptPackageInfo | undefined> {
  try {
    const { stdout } = await execa("apt-cache", [
      "show",
      version !== undefined && version !== ""
        ? `${name}=${version}`
        : name,
    ], { env: getAptEnv(apt), stdout: "pipe" })

    const stdoutTrim = (stdout as string).trim()

    if (stdoutTrim === "") {
      return undefined
    }

    // parse the version from the output
    // Version: 4:11.2.0-1ubuntu1
    const versionMatch = stdoutTrim.match(/^Version: (.*)$/m)

    if (versionMatch !== null) {
      const actualVersion = versionMatch[1]
      return {
        name,
        version: actualVersion,
        qualified: `${name}-${actualVersion}`,
      }
    }

    return undefined
  } catch {
    // ignore
  }

  return undefined
}
