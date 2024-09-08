import { info } from "ci-log"
import { readFile } from "fs/promises"

/**
 * The list of assets
 * @key tag The tag of the release
 * @value assets The names of the assets of the release
 */
export type Assets = Record<string, string[]>

/**
 * Load the list of assets from a json file
 */
export async function loadAssetList(path: string): Promise<Assets> {
  const data = await readFile(path, "utf-8")
  return JSON.parse(data)
}

type MatchAssetOpts = {
  version: string
  keywords?: string[]
  optionalKeywords?: string[]
  filterMapTag?: (tag: string) => string | undefined
  filterName?: (asset: string) => boolean
}

/**
 * Match the asset that matches the version and given keywords
 */
export function matchAsset(
  assets: Assets,
  opts: MatchAssetOpts,
): { tag: string; name: string } | undefined {
  // match the tag
  const assetVersion = matchAssetVersion(assets, opts)
  if (assetVersion === undefined) {
    return undefined
  }
  const { tag, assetNames } = assetVersion

  // if no keywords are given, return the first asset
  if (!opts.keywords?.length && !opts.optionalKeywords?.length) {
    return { tag, name: assetNames[0] }
  }

  // check if the asset contains all the keywords
  let candidates: string[] = []
  if (opts.keywords?.length) {
    for (const name of assetNames) {
      if (opts.keywords!.every((keyword) => name.includes(keyword))) {
        candidates.push(name)
      }
    }
  } else {
    candidates = assetNames
  }

  if (candidates.length === 0) {
    info(`no asset found for version ${opts.version} and keywords ${opts.keywords}`)
    return undefined
  }

  // prefer the candidates that contain more optional keywords
  if (opts.optionalKeywords?.length) {
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

function matchAssetVersion(assets: Assets, opts: MatchAssetOpts) {
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
    info(`no tag found for version ${opts.version}`)
    return undefined
  }

  // find the first tag that starts with the version
  // loop over the versions starting with the latest
  let foundVersion: string | undefined
  let foundOrigTag: string | undefined
  for (const [version, origTag] of versionMap.entries()) {
    if (
      version === opts.version
      || version.startsWith(opts.version)
    ) {
      foundVersion = version
      foundOrigTag = origTag
      break
    }
  }

  if (foundVersion === undefined || foundOrigTag === undefined) {
    info(`version ${opts.version} is not supported`)
    return undefined
  }

  // get the list of assets
  let assetNames = assets[foundOrigTag]
  if (assetNames === undefined) {
    info(`no asset found for version ${opts.version}`)
    return undefined
  }

  // filter the assets
  if (opts.filterName !== undefined) {
    assetNames = assetNames.filter(opts.filterName)
  }

  if (assetNames.length === 0) {
    info(`no asset found for version ${opts.version}`)
    return undefined
  }

  return { tag: foundOrigTag, assetNames }
}
