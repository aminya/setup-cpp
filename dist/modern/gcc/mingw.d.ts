import { type InstallationInfo, type PackageInfo } from "../utils/setup/setupBin.js";
export declare function setupMingw(version: string, setupDir: string, arch: string): Promise<InstallationInfo | undefined>;
export declare function getMinGWPackageInfo(version: string, platform: NodeJS.Platform, arch: string): Promise<PackageInfo>;
