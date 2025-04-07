import type { AddPathOptions } from "envosman";
import type { Inputs } from "./tool.ts";
import type { InstallationInfo } from "./utils/setup/setupBin.ts";
/**
 * The options for the setup-cpp function
 */
export type Opts = Partial<Record<Inputs, string | undefined>> & {
    "setup-cpp"?: boolean;
    timeout?: string;
    "node-package-manager"?: string;
};
/** Get an object from github actions */
export declare function maybeGetInput(key: string): string | undefined;
export declare function getSuccessMessage(tool: string, installationInfo: InstallationInfo | undefined | void): string;
export declare const rcOptions: AddPathOptions;
