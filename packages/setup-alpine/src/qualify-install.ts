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

/**
 * Check if a package is already installed
 * @param pkg The package to check
 * @returns Whether the package is installed
 */
export async function checkPackageInstalled(pkg: ApkPackage): Promise<boolean> {
  try {
    // First check if the package is installed at all
    const { exitCode } = await execRoot("apk", ["info", "-e", pkg.name], {
      reject: false,
      stdio: ["ignore", "pipe", "ignore"],
    })

    if (exitCode !== 0) {
      return false
    }

    // If no specific version is required, we're done
    if (pkg.version === undefined || pkg.version === "") {
      return true
    }

    // Check the installed version
    const { stdout: versionOutput } = await execRoot("apk", ["info", "-v", pkg.name], {
      stdio: ["ignore", "pipe", "ignore"],
    })

    // Parse the version from output (format is typically "package-name-version")
    const installedVersion = versionOutput.trim().split("-").slice(-1)[0]

    return installedVersion === pkg.version
  } catch (error) {
    return false
  }
}

/**
 * Filter out packages that are already installed and qualify those that need installation
 * @param packages List of packages to check
 * @returns List of packages that need to be installed
 */
export async function filterAndQualifyApkPackages(packages: ApkPackage[]): Promise<string[]> {
  const results = await Promise.all(
    packages.map(async (pack) => {
      const isInstalled = await checkPackageInstalled(pack)
      return isInstalled ? undefined : pack
    }),
  )

  return results.filter((pack): pack is ApkPackage => pack !== undefined)
    .map(formatPackageWithVersion)
}

/**
 * Format a package with its version if specified
 * @param pkg The package object
 * @returns Formatted package string (name=version or just name)
 */
export function formatPackageWithVersion(pkg: ApkPackage): string {
  if (pkg.version !== undefined && pkg.version !== "") {
    return `${pkg.name}=${pkg.version}`
  }
  return pkg.name
}
