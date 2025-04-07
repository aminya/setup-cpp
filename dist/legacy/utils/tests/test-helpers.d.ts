export declare function setupTmpDir(testName: string, useSpaces?: boolean): Promise<string>;
export declare function cleanupTmpDir(testName: string): Promise<void>;
export declare function testBin(name: string, args?: string[] | null, binDir?: string | undefined): Promise<void>;
export declare function runnerWindowsVersion(): number | undefined;
