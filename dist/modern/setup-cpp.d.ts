import { type Opts } from "./lib.ts";
/**
 * The options for the setup-cpp function
 */
type CliOpts = Opts & {
    help: boolean;
    version: boolean;
};
export declare function parseArgs(args: string[]): CliOpts;
export {};
