type Options = {
    /**
     * The directory to download the HTML files
     */
    htmlDownloadDir: string;
    /**
     * The path to write the output json file
     */
    path: string;
    /**
     * A generator that returns the version and the URL of the asset to download
     *
     * The generator should return a tuple of the version and the URL
     */
    getAssetVersionAndURL: () => Generator<[string, string], void, unknown>;
    /**
     * Filter the assets
     */
    filterAssets?: (asset: string) => boolean;
};
/**
 * Save the assets of the HTML files to a json file
 *
 * The assets are extracted from the href of the html files
 */
export declare function saveHTMLAssets(opts: Options): Promise<void>;
export {};
