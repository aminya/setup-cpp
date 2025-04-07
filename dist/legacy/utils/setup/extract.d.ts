export { extractTar, extractXar } from "@actions/tool-cache";
export declare enum ArchiveType {
    Tar = 0,
    TarGz = 1,
    TarXz = 2,
    Zip = 3,
    SevenZip = 4
}
export declare function getArchiveType(file: string): ArchiveType;
export declare function getExtractFunction(archiveType: ArchiveType): typeof extractTarByExe;
export declare function extract7Zip(file: string, dest: string): Promise<string>;
export declare function extractExe(file: string, dest: string): Promise<string>;
export declare function extractZip(file: string, dest: string): Promise<string>;
export declare function extractTarByExe(file: string, dest: string, stripComponents?: number, flags?: string[]): Promise<string>;
