import type { InstallationInfo } from "../utils/setup/setupBin.js";
export declare enum LLVMPackages {
    All = 0,
    ClangFormat = 1,
    Core = 2
}
/**
 * Try to setup LLVM via the apt package manager
 *
 * @param {string} version - The version of LLVM to install
 * @param {LLVMPackages} packages - The packages to install
 *
 * @returns {InstallationInfo} The installation info if the installation was successful
 * @returns {undefined} If the installation fails, it will try to remove the repository and will return undefined
 */
export declare function trySetupLLVMApt(version: string, packages?: LLVMPackages): Promise<InstallationInfo | undefined>;
/**
 * Setup LLVM via the apt package manager
 *
 * @note assumes this is running on an Ubuntu/Debian system
 *
 * @param {string} version - The version of LLVM to install
 * @param {LLVMPackages} packages - The packages to install
 *
 * @returns {InstallationInfo} The installation info if the installation was successful
 */
export declare function setupLLVMApt(version: string, packages?: LLVMPackages): Promise<InstallationInfo>;
