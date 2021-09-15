import { isValidUrl } from "../http/validate_url"
import semverCompare from "semver/functions/compare"
import { getExecOutput } from "@actions/exec"

/**
 * Gets the specific versions supported by this action compatible with the supplied (specific or minimum) version in
 * descending order of release (e.g., `5.0.2`, `5.0.1`, and `5.0.0` for `5`).
 */
export function getSpecificVersions(versions: Set<string>, semversion: string): string[] {
  return Array.from(versions)
    .filter((v) => /^\d+\.\d+\.\d+$/.test(v) && v.startsWith(semversion))
    .sort()
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
  getUrl: (platform: string, version: string) => string | null | Promise<string | null>
): Promise<[string, string]> {
  if (!versions.has(version)) {
    throw new Error(`Unsupported target! (platform='${platform}', version='${version}')`)
  }

  for (const specificVersion of getSpecificVersions(versions, version)) {
    // eslint-disable-next-line no-await-in-loop
    const url = await getUrl(platform, specificVersion)
    // eslint-disable-next-line no-await-in-loop
    if (url !== null && (await isValidUrl(url))) {
      return [specificVersion, url]
    }
  }

  throw new Error(`Unsupported target! (platform='${platform}', version='${version}')`)
}

export const versionRegex = /v(\d\S*)\s/

/** Get the version of a binary */
export async function getBinVersion(file: string) {
  try {
    const { stderr, stdout } = await getExecOutput(file, ["--version"])
    const version = stdout.match(versionRegex)?.[1] ?? stderr.match(versionRegex)?.[1]
    return version
  } catch (e) {
    console.error(e)
    return undefined
  }
}

/** Check if the given bin is up to date against the target version */
export async function isBinUptoDate(givenFile: string, targetVersion: string) {
  const givenVersion = await getBinVersion(givenFile)
  if (
    typeof givenVersion === "string" &&
    typeof targetVersion === "string" &&
    givenVersion !== "" &&
    targetVersion !== ""
  ) {
    return semverCompare(givenVersion, targetVersion) !== -1
  } else {
    // assume given version is old
    return false
  }
}
