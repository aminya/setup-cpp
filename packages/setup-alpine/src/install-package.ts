import { execRoot } from "admina"
import { info, warning } from "ci-log"
import { hasApk } from "./has-apk.js"
import { initApkMemoized } from "./init-apt.js"
import { type ApkPackage, filterAndQualifyApkPackages, formatPackageWithVersion } from "./qualify-install.js"
import { updateApkMemoized } from "./update.js"

/**
 * The information about an installation result
 */
export type InstallationInfo = {
  /** The install dir of the package (Defaults to `undefined`) */
  installDir?: string
  /** The bin dir of the package (Defaults to `/usr/bin`) */
  binDir: string
  /** The bin path of the package (Defaults to `undefined`) */
  bin?: string
}

/**
 * Install a package using Alpine's apk package manager
 * @param packages The packages to install
 * @param update Whether to update the package index before installing
 * @returns The installation information
 */
export async function installApkPack(packages: ApkPackage[], update = false): Promise<InstallationInfo> {
  // Check if apk is available
  if (!(await hasApk())) {
    throw new Error("apk is not available on this system")
  }

  try {
    // Update package index if requested

    // init the apk
    await initApkMemoized()

    if (update) {
      // Force update the repos
      await updateApkMemoized.clear()
    }
    // Update the repos if needed
    await updateApkMemoized()

    const packagesToInstall = await filterAndQualifyApkPackages(packages)

    if (packagesToInstall.length === 0) {
      info("All packages are already installed")
      return { binDir: "/usr/bin" }
    }

    // Install the packages
    info(`Installing ${packagesToInstall.join(" ")}`)
    await execRoot("apk", ["add", ...packagesToInstall])

    info(`Successfully installed ${packagesToInstall.join(" ")}`)
    return { binDir: "/usr/bin" }
  } catch (error) {
    warning(`Failed to install ${packages.map((pkg) => formatPackageWithVersion(pkg)).join(" ")}: ${error}`)
    throw error
  }
}
