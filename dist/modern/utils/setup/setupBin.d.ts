/** A type that describes a package */
export type PackageInfo = {
    /** Url to download the package */
    url: string;
    /** The top folder name once it is extracted. It can be `""` if there is no top folder */
    extractedFolderName: string;
    /** The relative directory in which the binary is located. It can be `""` if the exe is in the top folder */
    binRelativeDir: string;
    /** The main binary file. */
    binFileName: string;
    /** The function to extract the downloaded archive. It can be `undefined`, if the binary itself is downloaded directly. */
    extractFunction?: (file: string, dest: string) => Promise<unknown>;
};
export type InstallationInfo = {
    /** The top install dir */
    installDir?: string;
    binDir: string;
    bin?: string;
};
/**
 * A function that:
 *
 * - Downloads and extracts a package
 * - Adds the bin path of the package to PATH
 * - Caches the downloaded directory into tool cache for usage from other sessions
 *
 * @returns The installation directory
 */
export declare function setupBin(name: string, version: string, getPackageInfo: (version: string, platform: NodeJS.Platform, arch: string) => PackageInfo | Promise<PackageInfo>, setupDir: string, arch: string): Promise<InstallationInfo>;
