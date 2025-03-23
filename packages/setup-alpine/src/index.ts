import { execRoot } from "admina"
import { info, warning } from "ci-log"
import { hasApk } from "./has-apk.js"
import { type ApkPackage, filterAndQualifyApkPackages, formatPackageWithVersion } from "./qualify-install.js"
import { updateApkMemoized } from "./update.js"

export type { ApkPackage }

/**
 * Install a package using Alpine's apk package manager
 * @param packages The packages to install
 * @param update Whether to update the package index before installing
 * @returns Whether the installation was successful
 */
export async function installApkPackage(packages: ApkPackage[], update = false): Promise<boolean> {
  // Check if apk is available
  if (!(await hasApk())) {
    warning("apk is not available on this system")
    return false
  }

  try {
    // Update package index if requested

    if (update) {
      // Force update the repos
      await updateApkMemoized.clear()
    }
    // Update the repos if needed
    await updateApkMemoized()

    const packagesToInstall = await filterAndQualifyApkPackages(packages)

    if (packagesToInstall.length === 0) {
      info("All packages are already installed")
      return true
    }

    // Install the packages
    info(`Installing ${packagesToInstall.join(" ")}`)
    await execRoot("apk", ["add", ...packagesToInstall])

    info(`Successfully installed ${packagesToInstall.join(" ")}`)
    return true
  } catch (error) {
    warning(`Failed to install ${packages.map((pkg) => formatPackageWithVersion(pkg)).join(" ")}: ${error}`)
    return false
  }
}
