/**
 * Save the list of all releases of a GitHub repository to a json file
 */
export declare function saveGitHubAssetList(owner: string, repo: string, path: string, filterAssets?: (asset: string) => boolean): Promise<void>;
