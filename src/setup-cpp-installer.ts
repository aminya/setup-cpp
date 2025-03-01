import { error, info } from "ci-log"
import { execa } from "execa"
import which from "which"
/**
 * Install the setup-cpp CLI globally
 * @param version - The version of setup-cpp to install
 * @param packageManager - The package manager to use
 */
export async function installSetupCpp(version: string, packageManager: string = "npm") {
  try {
    // check if `setup-cpp` is available in the shell, if so, skip the installation to avoid overwriting the existing version
    const setupCppPath = await which("setup-cpp", { nothrow: true })
    if (setupCppPath !== null) {
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
