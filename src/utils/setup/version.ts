import { getExecOutput } from "@actions/exec"
import { info } from "ci-log"
import { isUrlOnline } from "is-url-online"
import semverCoerce from "semver/functions/coerce"
import semverCompare from "semver/functions/compare"
import semverValid from "semver/functions/valid"

/**
 * Gets the specific versions supported by this action compatible with the supplied (specific or minimum) version in
 * descending order of release (e.g., `5.0.2`, `5.0.1`, and `5.0.0` for `5`).
 */
export function getSpecificVersions(versions: Set<string>, semversion: string): string[] {
  return Array.from(versions)
    .filter((v) => /^\d+\.\d+\.\d+$/.test(v) && v.startsWith(semversion))
    .sort((a, b) => {
      try {
        return semverCompare(a, b)
      } catch (err) {
        return a.localeCompare(b)
      }
    })
    .reverse()
}

/**
 * Gets the specific and minimum versions that can be used to refer to the supplied specific versions (e.g., `3`, `3.5`,
 * `3.5.2` for `3.5.2`).
 */
export function getVersions(specific: string[]): Set<string> {
  const versions = new Set(specific)

  for (const version of specific) {
    versions.add(/^\d+/.exec(version)![0])
    versions.add(/^\d+\.\d+/.exec(version)![0])
  }

  return versions
}

/** Gets the most recent specific version for which there is a valid download URL. */
export async function getSpecificVersionAndUrl(
  versions: Set<string>,
  platform: string,
  version: string,
  getUrl: (platform: string, version: string) => string | null | Promise<string | null>,
): Promise<[string, string]> {
  // specific ubuntu version
  if (platform === "linux" && version.includes("ubuntu")) {
    const url = await getUrl(platform, version)
    // eslint-disable-next-line no-await-in-loop
    if (url !== null && (await isUrlOnline(url))) {
      return [version, url]
    }
  }

  // if the given set doesn't include the version, throw an error
  if (!versions.has(version)) {
    throw new Error(
      `Unsupported target! (platform='${platform}', version='${version}'). Try one of the following: ${
        JSON.stringify(
          versions,
        )
      }`,
    )
  }

  const offlineUrls: string[] = []

  // TODO use Promise.any
  for (const specificVersion of getSpecificVersions(versions, version)) {
    // eslint-disable-next-line no-await-in-loop
    const url = await getUrl(platform, specificVersion)
    if (url !== null) {
      // eslint-disable-next-line no-await-in-loop
      if (await isUrlOnline(url)) {
        return [specificVersion, url]
      } else {
        offlineUrls.push(url)
      }
    }
  }

  throw new Error(
    `Unsupported target! (platform='${platform}', version='${version}'). Try one of the following: ${
      JSON.stringify(
        versions,
      )
    }`,
  )
}

export const defaultVersionRegex = /v?(\d\S*)/

/** Get the version of a binary */
export async function getBinVersion(file: string, versionRegex: RegExp = defaultVersionRegex) {
  try {
    const execout = await getExecOutput(file, ["--version"])
    const version_output = execout.stdout || execout.stderr || ""
    const version = version_output.trim().match(versionRegex)?.[1]
    return semverCoerce(version) ?? undefined
  } catch (e) {
    console.error(e)
    return undefined
  }
}

/** Check if the given bin is up to date against the target version */
export async function isBinUptoDate(
  givenFile: string,
  targetVersion: string,
  versionRegex: RegExp = defaultVersionRegex,
) {
  const givenVersion = await getBinVersion(givenFile, versionRegex)
  if (givenVersion !== undefined && targetVersion !== "") {
    return semverCompare(givenVersion, targetVersion) !== -1
  } else {
    // assume given version is old
    return false
  }
}

/** Coerce the given version if it is invalid */
export function semverCoerceIfInvalid(version: string) {
  if (semverValid(version) === null) {
    // version coercion
    try {
      // find the semver version of an integer
      const coercedVersion = semverCoerce(version)
      if (coercedVersion !== null) {
        info(`Coerced version '${version}' to '${coercedVersion}'`)
        return coercedVersion.version
      }
    } catch (err) {
      // handled below
    }
  }
  return version
}

/**
 * Coerce the given version to a semver range if it is invalid
 */
export function semverCoercedRangeIfInvalid(version: string) {
  if (semverValid(version) === null) {
    // version coercion
    try {
      // find the semver version of an integer
      const coercedVersion = semverCoerce(version)
      if (coercedVersion !== null) {
        // if the versions doesn't specify a range specifier (e.g. ^, ~, >, <, etc.), add a ^ to the version
        const versionRange = /^[<=>^~]/.test(coercedVersion.version)
          ? coercedVersion.version
          : `^${coercedVersion.version}`

        info(`Coerced version '${version}' to '${versionRange}'`)
        return versionRange
      }
    } catch (err) {
      // handled below
    }
  }
  return version
}

export function removeVPrefix(version: string) {
  return Number.parseInt(version.replace(/^v/, ""), 10)
}

export function addVPrefix(version: string) {
  if (!version.match(/^v/)) {
    return `v${version}`
  }
  return version
}

export function compareVersion(tag1: string, tag2: string) {
  const v1 = semverCoerce(tag1)
  const v2 = semverCoerce(tag2)
  if (v1 !== null && v2 !== null) {
    // put the latest version first
    return v2.compare(v1)
  }

  // if the tags are not semver, compare them as strings, putting the latest tag first
  return tag2.localeCompare(tag1)
}
