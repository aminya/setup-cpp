import type { InstallationInfo } from "./setupBin.js";
type DnfPackage = {
    name: string;
    version?: string;
};
/** A function that installs a package using dnf */
export declare function setupDnfPack(packages: DnfPackage[]): Promise<InstallationInfo>;
export {};
