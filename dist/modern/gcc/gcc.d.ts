import type { InstallationInfo } from "../utils/setup/setupBin.js";
export declare const dirname: string;
export declare function setupGcc(version: string, setupDir: string, arch: string, priority?: number): Promise<InstallationInfo | undefined>;
