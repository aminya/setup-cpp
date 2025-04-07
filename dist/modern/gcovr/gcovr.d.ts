export declare function setupGcovr(version: string | undefined, _setupDir: string, _arch: string): Promise<import("../utils/setup/setupBin.js").InstallationInfo>;
export declare function activateGcovLLVM(): Promise<void>;
export declare function activateGcovGCC(gccVersion: string): Promise<void>;
