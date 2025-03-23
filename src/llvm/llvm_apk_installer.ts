import path, { join } from "path"
import { fileURLToPath } from "url"
import { execRootSync } from "admina"
import { info } from "ci-log"
import { type InstallationInfo, hasApk, installApkPackage } from "setup-alpine"
import { majorLLVMVersion } from "./utils.ts"

const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

/**
 * Try to setup LLVM via the apk package manager
 *
 * @param {string} version - The version of LLVM to install
 *
 * @returns {InstallationInfo} The installation info if the installation was successful
 * @returns {undefined} If the installation fails, it will try to remove the repository and will return undefined
 */
export async function trySetupLLVMApk(
  version: string,
): Promise<InstallationInfo | undefined> {
  if (!await hasApk()) {
    return undefined
  }

  try {
    return await setupLLVMApk(version)
  } catch (err) {
    info(`Failed to install llvm via system package manager ${err}. Trying to remove the repository`)
    try {
      execRootSync(join(dirname, "llvm_repo_remove.bash"), [`${majorLLVMVersion(version)}`])
    } catch (removeErr) {
      info(`Failed to remove llvm repository ${removeErr}`)
    }
  }
  return undefined
}

export function setupLLVMApk(version: string): Promise<InstallationInfo> {
  return installApkPackage([{ name: "llvm", version }])
}
