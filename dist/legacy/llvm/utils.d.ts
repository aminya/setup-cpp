import memoize from "memoizee";
declare function majorLLVMVersion_(version: string): number;
export declare const majorLLVMVersion: typeof majorLLVMVersion_ & memoize.Memoized<typeof majorLLVMVersion_>;
export {};
