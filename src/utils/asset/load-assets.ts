import { readFile } from "fs/promises"
import semverSatisfies from "semver/functions/satisfies.js"

/**
 * The list of assets
 * @key tag The tag of the release
 * @value assets The names of the assets of the release
 */
export type Assets = Record<string, string[] | undefined>

/**
 * Load the list of assets from a json file
 */
export async function loadAssetList(path: string): Promise<Assets> {
  const data = await readFile(path, "utf-8")
  return JSON.parse(data)
}

/**
 * The options to match the asset
 */
export type MatchAssetOpts = {
  /**
   * The version to match
   */
  version: string
  /**
   * The keywords that must be in the asset name
   * @default []
   */
  keywords?: string[]
  /**
   * Optional keywords that are not required to be in the asset name
   * but increase the score of the asset if they are present
   * @default []
   */
  optionalKeywords?: string[]
  /**
   * Custom version compare function
   * @param candidate The candidate version
   * @returns true if the candidate version satisfies the version
   *
   * @default semverSatisfies
   */
  versionSatisfies?: (candidate: string) => boolean
  /**
   * Custom tag filter and map function
   * @param tag The tag to filter and map
   * @returns The mapped tag or undefined if the tag should be
   * excluded from the search
   * @default undefined
   */
  filterMapTag?: (tag: string) => string | undefined
  /**
   * Custom asset name filter function
   * @param asset The asset name to filter
   * @returns true if the asset should be included in the search
   * @default undefined
   */
  filterName?: (asset: string) => boolean
}

/**
 * Match the asset that matches the version and given keywords
 * @param assets The list of assets
 * @param opts The options to match the asset
 * @returns The tag and name of the asset that matches the version and keywords
 */
export function matchAsset(
  assets: Assets,
  opts: MatchAssetOpts,
): { tag: string; name: string } | undefined {
  // get the list of versions
  const origTags = Object.keys(assets)

  // filter/map the tags
  const versionMap: Map<string, string> = new Map()
  if (opts.filterMapTag === undefined) {
    for (const origTag of origTags) {
      versionMap.set(origTag, origTag)
    }
  } else {
    for (const origTag of origTags) {
      const mappedTag = opts.filterMapTag(origTag)
      if (mappedTag !== undefined) {
        versionMap.set(mappedTag, origTag)
      }
    }
  }

  if (versionMap.size === 0) {
    return undefined
  }

  // Assume the version is a semver version if a custom version compare function is not given
  const versionSatisfies = opts.versionSatisfies ?? semverSatisfies

  // find the first tag that starts with the version
  // loop over the versions starting with the latest
  const candidateTags: string[] = []
  for (const [version, origTag] of versionMap.entries()) {
    if (versionSatisfies(version, opts.version)) {
      candidateTags.push(origTag)
    }
  }

  if (candidateTags.length === 0) {
    return undefined
  }

  // Loop over the candidate tags and return the first one that has assets
  for (const candidateTag of candidateTags) {
    // get the list of assets
    let assetNames = assets[candidateTag]
    if (assetNames === undefined) {
      continue
    }

    // filter the assets
    if (opts.filterName !== undefined) {
      assetNames = assetNames.filter(opts.filterName)
    }

    if (assetNames.length === 0) {
      continue
    }

    // check if this version contains the keywords and optional keywords in the asset name
    const match = matchAssetName(candidateTag, assetNames, opts)
    if (match !== undefined) {
      return match
    }
  }

  return undefined
}

function matchAssetName(tag: string, assetNames: string[], opts: MatchAssetOpts) {
  // if no keywords are given, return the first asset
  if (
    (opts.keywords === undefined
      || opts.keywords.length === 0)
    && (opts.optionalKeywords === undefined
      || opts.optionalKeywords.length === 0)
  ) {
    return { tag, name: assetNames[0] }
  }

  // check if the asset contains all the keywords
  let candidates: string[] = []
  if (
    opts.keywords !== undefined
    && opts.keywords.length !== 0
  ) {
    for (const name of assetNames) {
      if (opts.keywords!.every((keyword) => name.includes(keyword))) {
        candidates.push(name)
      }
    }
  } else {
    candidates = assetNames
  }

  if (candidates.length === 0) {
    return undefined
  }

  // prefer the candidates that contain more optional keywords
  if (
    opts.optionalKeywords !== undefined
    && opts.optionalKeywords.length !== 0
  ) {
    // rate the candidates based on the number of optional keywords they contain
    const candidateScores = candidates.map((name) => {
      let score = 0
      for (const keyword of opts.optionalKeywords!) {
        if (name.includes(keyword)) {
          score++
        }
      }
      return score
    })

    // find the candidate with the highest score
    const maxScore = Math.max(...candidateScores)
    const maxIndex = candidateScores.indexOf(maxScore)
    return { tag, name: candidates[maxIndex] }
  }

  // return the first candidate if no optional keywords are given
  return { tag, name: candidates[0] }
}
