import { execRoot } from "admina"
import { info, warning } from "ci-log"
import { pathExists } from "path-exists"
import { hasApk } from "./has-apk.js"

/**
 * Add an APK repository
 * @param repoUrl The URL of the repository to add
 * @returns Whether the repository was added successfully
 */

export async function addApkRepository(repoUrl: string): Promise<boolean> {
  if (!(await hasApk())) {
    warning("apk is not available on this system")
    return false
  }

  try {
    // Check if repositories file exists
    const reposFile = "/etc/apk/repositories"
    if (!(await pathExists(reposFile))) {
      warning(`APK repositories file not found at ${reposFile}`)
      return false
    }

    // Add repository to the file
    info(`Adding repository: ${repoUrl}`)
    await execRoot("sh", ["-c", `echo "${repoUrl}" >> ${reposFile}`], { stdio: "inherit" })

    // Update package index after adding repository
    await execRoot("apk", ["update"], { stdio: "inherit" })

    info(`Successfully added repository: ${repoUrl}`)
    return true
  } catch (error) {
    warning(`Failed to add repository ${repoUrl}: ${error}`)
    return false
  }
}
