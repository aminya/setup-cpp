import { info } from "ci-log"
import { type InstallationInfo, hasApk, installApkPack } from "setup-alpine"
import { majorLLVMVersion } from "./utils.ts"

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
    info(`Failed to install llvm via system package manager ${err}.`)
  }
  return undefined
}

export function setupLLVMApk(version: string): Promise<InstallationInfo> {
  const majorVersion = majorLLVMVersion(version)
  return installApkPack([{ name: `llvm${majorVersion}` }])
}
