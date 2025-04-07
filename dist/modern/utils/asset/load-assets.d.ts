/**
 * The list of assets
 * @key tag The tag of the release
 * @value assets The names of the assets of the release
 */
export type Assets = Record<string, string[] | undefined>;
/**
 * Load the list of assets from a json file
 */
export declare function loadAssetList(path: string): Promise<Assets>;
/**
 * The options to match the asset
 */
export type MatchAssetOpts = {
    /**
     * The version to match
     */
    version: string;
    /**
     * The keywords that must be in the asset name.
     * If the element is a string, the keyword must be in the asset name.
     * If the element is an array, one of the keywords must be in the asset name.
     * @default []
     */
    keywords?: (string | string[])[];
    /**
     * Optional keywords that are not required to be in the asset name
     * but increase the score of the asset if they are present
     *
     * if the element is a string, the keyword must be in the asset name
     * if the element is an array, one of the keywords must be in the asset name
     * @default []
     */
    optionalKeywords?: (string | string[])[];
    /**
     * Custom version compare function
     * @param candidate The candidate version
     * @param coeredVersion The coerced version to compare against
     * @returns true if the candidate version satisfies the version
     *
     * @default semverSatisfies
     */
    versionSatisfies?: (candidate: string, coeredVersion: string) => boolean;
    /**
     * Custom tag filter and map function
     * @param tag The tag to filter and map
     * @returns The mapped tag or undefined if the tag should be
     * excluded from the search
     * @default undefined
     */
    filterMapTag?: (tag: string) => string | undefined;
    /**
     * Custom asset name filter function
     * @param asset The asset name to filter
     * @returns true if the asset should be included in the search
     * @default undefined
     */
    filterName?: (asset: string) => boolean;
};
/**
 * Match the asset that matches the version and given keywords
 * @param assets The list of assets
 * @param opts The options to match the asset
 * @returns The tag and name of the asset that matches the version and keywords
 */
export declare function matchAsset(assets: Assets, opts: MatchAssetOpts): {
    tag: string;
    name: string;
} | undefined;
