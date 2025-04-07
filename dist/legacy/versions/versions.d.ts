import type { CompilerInfo } from "../compilers.js";
import type { Opts } from "../options.js";
import type { Inputs, ToolName } from "../tool.js";
export declare function getVersion(name: ToolName, version: string | undefined, distroVersion?: number[] | null): string;
/** Get the default version if passed true or undefined, otherwise return the version itself */
export declare function getVersionDefault(tool: ToolName | "pip", distroVersion?: number[] | null): string | undefined;
/**
 * Sync the versions for the given inputs
 *
 * It modifies the opts object to have the same version for all the tools
 * If the return is false, it means that versions don't match the target version
 * @param opts - The options object (modified in place)
 * @param tools - The tools to sync the versions for (it can include `compiler`)
 * @param compilerInfo - The compiler info to sync the versions for (if any)
 */
export declare function syncVersions(opts: Opts, toolsGiven: Inputs[], compilerInfo?: CompilerInfo | undefined): boolean;
export declare function isMinVersion(version: string): boolean;
