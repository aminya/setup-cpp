export type CompilerInfo = {
    compiler: string;
    version: string | undefined;
};
/**
 * Detecting the compiler version by looking for a version-like pattern.
 * Supports compiler names that contain hyphens and various version formats.
 *
 * @param compilerAndVersion - The compiler and version string
 * @returns The compiler and version
 *
 * @nothrow It doesn't throw any error, but it logs the error if it fails to parse the compiler info
 */
export declare function getCompilerInfo(compilerAndVersion: string): CompilerInfo;
/** Installing the specified compiler */
export declare function installCompiler(compiler: string, version: string | undefined, osVersion: number[] | null, setupCppDir: string, arch: string, successMessages: string[], errorMessages: string[]): Promise<void>;
