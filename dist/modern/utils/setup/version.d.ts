/**
 * Gets the specific versions supported by this action compatible with the supplied (specific or minimum) version in
 * descending order of release (e.g., `5.0.2`, `5.0.1`, and `5.0.0` for `5`).
 */
export declare function getSpecificVersions(versions: Set<string>, semversion: string): string[];
/**
 * Gets the specific and minimum versions that can be used to refer to the supplied specific versions (e.g., `3`, `3.5`,
 * `3.5.2` for `3.5.2`).
 */
export declare function getVersions(specific: string[]): Set<string>;
/** Gets the most recent specific version for which there is a valid download URL. */
export declare function getSpecificVersionAndUrl(versions: Set<string>, platform: string, version: string, getUrl: (platform: string, version: string) => string | null | Promise<string | null>): Promise<[string, string]>;
export declare const defaultVersionRegex: RegExp;
/** Get the version of a binary */
export declare function getBinVersion(file: string, versionRegex?: RegExp): Promise<import("semver").SemVer | undefined>;
/** Check if the given bin is up to date against the target version */
export declare function isBinUptoDate(givenFile: string, targetVersion: string, versionRegex?: RegExp): Promise<boolean>;
/** Coerce the given version if it is invalid */
export declare function semverCoerceIfInvalid(version: string): string;
/**
 * Coerce the given version to a semver range if it is invalid
 */
export declare function semverCoercedRangeIfInvalid(version: string): string;
export declare function removeVPrefix(version: string): number;
export declare function addVPrefix(version: string): string;
export declare function compareVersion(tag1: string, tag2: string): number;
