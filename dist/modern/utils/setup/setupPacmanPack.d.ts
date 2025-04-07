import type { InstallationInfo } from "./setupBin.js";
/** A function that installs a package using pacman */
export declare function setupPacmanPack(name: string, version?: string, aur?: string): Promise<InstallationInfo>;
