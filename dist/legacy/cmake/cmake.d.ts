import { type InstallationInfo } from "../utils/setup/setupBin.js";
/** Setup cmake */
export declare function setupCmake(version: string, setupDir: string, arch: string): Promise<InstallationInfo>;
