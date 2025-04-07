import type { InstallationInfo } from "../utils/setup/setupBin.js";
export declare function setupPython(version: string, setupDir: string, arch: string): Promise<InstallationInfo & {
    bin: string;
}>;
