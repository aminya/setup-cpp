import memoize from "memoizee";
import type { InstallationInfo } from "./setupBin.js";
export type SetupPipPackOptions = {
    /** Whether to use pipx instead of pip */
    usePipx?: boolean;
    /** Whether to install the package as a user */
    user?: boolean;
    /** Whether to upgrade the package */
    upgrade?: boolean;
    /** Whether the package is a library */
    isLibrary?: boolean;
    /** python version (e.g. >=3.8.0) */
    pythonVersion?: string;
};
/** A function that installs a package using pip */
export declare function setupPipPack(name: string, version?: string, options?: SetupPipPackOptions): Promise<InstallationInfo>;
export declare function setupPipPackWithPython(givenPython: string, name: string, version?: string, options?: SetupPipPackOptions): Promise<InstallationInfo>;
export declare function hasPipxBinary(): Promise<boolean>;
export declare function hasPipxModule(givenPython: string): Promise<boolean>;
export declare function setupPipPackSystem(name: string, givenAddPythonPrefix?: boolean): Promise<InstallationInfo | null>;
declare function addPythonBaseExecPrefix_(python: string): Promise<string[]>;
/**
 * Add the base exec prefix to the PATH. This is required for Conan, Meson, etc. to work properly.
 *
 * The answer is cached for subsequent calls
 */
export declare const addPythonBaseExecPrefix: typeof addPythonBaseExecPrefix_ & memoize.Memoized<typeof addPythonBaseExecPrefix_>;
declare function getPythonBaseExecPrefix_(python: string): Promise<string>;
/**
 * Get the base exec prefix of a Python installation
 * This is the directory where the Python interpreter is installed
 * and where the standard library is located
 */
export declare const getPythonBaseExecPrefix: typeof getPythonBaseExecPrefix_ & memoize.Memoized<typeof getPythonBaseExecPrefix_>;
declare function isExternallyManaged_(python: string): Promise<boolean>;
/**
 * Check if the given Python installation is externally managed
 * This is required for Conan, Meson, etc. to work properly
 *
 * The answer is cached for subsequent calls
 */
export declare const isExternallyManaged: typeof isExternallyManaged_ & memoize.Memoized<typeof isExternallyManaged_>;
export {};
