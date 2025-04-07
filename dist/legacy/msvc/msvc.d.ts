type MSVCVersion = "2022" | "17.0" | "2019" | "16.0" | "2017" | "15.0" | "2015" | "14.0" | "2013" | "12.0" | string;
export declare function setupMSVC(versionGiven: MSVCVersion, _setupDir: string, arch: string, sdk?: string, uwp?: boolean, spectre?: boolean): Promise<void>;
export {};
