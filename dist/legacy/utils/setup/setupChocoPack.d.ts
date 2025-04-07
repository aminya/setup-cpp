import type { InstallationInfo } from "./setupBin.js";
/** A function that installs a package using choco */
export declare function setupChocoPack(name: string, version?: string, args?: string[]): Promise<InstallationInfo>;
