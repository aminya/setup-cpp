import type { InstallationInfo } from "../utils/setup/setupBin.js";
export declare function setupLLVM(version: string, setupDir: string, arch: string): Promise<InstallationInfo>;
export declare function activateLLVM(directory: string, version: string): Promise<void>;
/**
 * Setup clang-format
 *
 * This uses the LLVM installer on Ubuntu, and the LLVM binaries on other platforms
 */
export declare function setupClangFormat(version: string, setupDir: string, arch: string): Promise<InstallationInfo>;
/** Setup llvm tools (clang tidy, etc.) without activating llvm and using it as the compiler */
export declare function setupClangTools(version: string, setupDir: string, arch: string): Promise<InstallationInfo>;
