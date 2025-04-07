import { type InstallationInfo } from "setup-alpine";
/**
 * Try to setup LLVM via the apk package manager
 *
 * @param {string} version - The version of LLVM to install
 *
 * @returns {InstallationInfo} The installation info if the installation was successful
 * @returns {undefined} If the installation fails, it will try to remove the repository and will return undefined
 */
export declare function trySetupLLVMApk(version: string): Promise<InstallationInfo | undefined>;
export declare function setupLLVMApk(version: string): Promise<InstallationInfo>;
