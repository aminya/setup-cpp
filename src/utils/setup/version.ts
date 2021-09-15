/**
 * Gets the specific LLVM versions supported by this action compatible with the supplied (specific or minimum) LLVM
 * version in descending order of release (e.g., `5.0.2`, `5.0.1`, and `5.0.0` for `5`).
 */
export function getSpecificVersions(versions: Set<string>, semversion: string): string[] {
  return Array.from(versions)
    .filter((v) => /^\d+\.\d+\.\d+$/.test(v) && v.startsWith(semversion))
    .sort()
    .reverse()
}

/**
 * Gets the specific and minimum LLVM versions that can be used to refer to the supplied specific LLVM versions (e.g.,
 * `3`, `3.5`, `3.5.2` for `3.5.2`).
 */
export function getVersions(specific: string[]): Set<string> {
  const versions = new Set(specific)

  for (const version of specific) {
    versions.add(/^\d+/.exec(version)![0])
    versions.add(/^\d+\.\d+/.exec(version)![0])
  }

  return versions
}
