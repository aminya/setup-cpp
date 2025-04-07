import { type ToolName } from "./tool.js";
export declare const DEFAULT_TIMEOUT: number;
export declare function installTool(tool: ToolName, version: string, osVersion: number[] | null, arch: string, setupCppDir: string, successMessages: string[], errorMessages: string[], _timeout?: number): Promise<void>;
