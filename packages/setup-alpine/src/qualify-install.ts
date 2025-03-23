import { execRoot } from "admina"

/**
 * The information about an apt package
 */
export type ApkPackage = {
  /** The name of the package */
  name: string
  /** The version of the package (optional) */
  version?: string
  /** The repository to add before installing the package (optional) */
  repository?: string
  /**
   * If the given version is not available, fall back to the latest version
   * @default false
   */
  fallBackToLatest?: boolean
}

export async function filterAndQualifyApkPackages(packages: ApkPackage[]) {
  // Filter out packages that are already installed
  const installedPackages = await Promise.all(packages.map(checkPackageInstalled))
  return packages.filter((_pack, index) => !installedPackages[index])
}
/**
 * Check if a package is already installed
 * @param pack The package to check
 * @returns Whether the package is installed
 */

async function checkPackageInstalled(pack: ApkPackage): Promise<boolean> {
  try {
    const { exitCode } = await execRoot("apk", ["info", "-e", pack.name], { reject: false })
    return exitCode === 0
  } catch (error) {
    return false
  }
}
