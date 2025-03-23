import { info } from "ci-log"
import { appendFile, readFile } from "fs/promises"
import { pathExists } from "path-exists"
import { hasApk } from "./has-apk.js"
import { updateApkMemoized } from "./update.js"

/**
 * Add an APK repository
 * @param repoUrl The URL of the repository to add
 * @returns Whether the repository was added successfully
 */

export async function addApkRepository(repoUrl: string): Promise<boolean> {
  if (!(await hasApk())) {
    throw new Error("apk is not available on this system")
  }

  try {
    // Check if repositories file exists
    const reposFile = "/etc/apk/repositories"
    if (!(await pathExists(reposFile))) {
      throw new Error(`APK repositories file not found at ${reposFile}`)
    }

    // Add repository to the file
    info(`Adding repository: ${repoUrl}`)
    await appendFile(reposFile, `${repoUrl}\n`)

    // Update package index after adding repository
    await updateApkMemoized.clear()
    await updateApkMemoized()

    info(`Successfully added repository: ${repoUrl}`)
    return true
  } catch (error) {
    throw new Error(`Failed to add repository ${repoUrl}: ${error}`)
  }
}

/**
 * Enable the community repository
 * @returns Whether the repository was added successfully
 */
export async function enableCommunityRepository() {
  const alpineVersion = (await getAlpineVersion()).split(".").slice(0, 2).join(".")

  return addApkRepository(`https://dl-cdn.alpinelinux.org/alpine/v${alpineVersion}/community/`)
}

/**
 * Get the Alpine version
 * @returns The Alpine version
 */
export async function getAlpineVersion() {
  const releaseFile = "/etc/alpine-release"
  if (!(await pathExists(releaseFile))) {
    throw new Error(`Alpine release file not found at ${releaseFile}`)
  }
  return readFile(releaseFile, "utf8")
}
