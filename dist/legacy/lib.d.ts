import packageJson from "../package-version.json";
import { type Opts } from "./options.js";
export { GITHUB_ACTIONS } from "ci-info";
export * from "ci-log";
export { packageJson };
export { maybeGetInput, type Opts } from "./options.js";
export { type Inputs, inputs } from "./tool.js";
/**
 * The result of the setup, with the success and error messages. If the setup was successful, the error messages are empty.
 */
export type SetupCppResult = {
    successMessages: string[];
    errorMessages: string[];
};
/**
 * Set up the C++ tools
 *
 * @param opts - The options
 * @returns The result of the setup, with the success and error messages. If the setup was successful, the error messages are empty.
 */
export declare function setupCpp(opts?: Opts): Promise<SetupCppResult>;
