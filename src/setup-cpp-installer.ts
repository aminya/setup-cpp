import { GITHUB_ACTIONS } from "ci-info"
import { error, info } from "ci-log"
import { execa } from "execa"
/**
 * Install the setup-cpp CLI globally
 * @param version - The version of setup-cpp to install
 * @param packageManager - The package manager to use
 */
export async function installSetupCpp(version: string, packageManager: string = "npm") {
  try {
    // check if running in github actions
    if (!GITHUB_ACTIONS) {
      return
    }

    // Install setup-cpp globally
    info(`Installing setup-cpp@${version} via ${packageManager}...`)
    await execa(packageManager, ["install", "-g", `setup-cpp@${version}`], {
      stdio: "inherit",
      // 1 minutes timeout
      timeout: 1000 * 60 * 1,
    })
  } catch (err) {
    error(`Failed to install the setup-cpp@${version} CLI: ${err}. Ignoring...`)
  }
}
