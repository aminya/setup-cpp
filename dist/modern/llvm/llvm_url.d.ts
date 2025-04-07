import type { PackageInfo } from "../utils/setup/setupBin.js";
export declare function getLLVMPackageInfo(version: string, platform: NodeJS.Platform, arch: string): Promise<PackageInfo>;
export declare function getLLVMAssetURL(platform: string, arch: string, version: string): Promise<string>;
