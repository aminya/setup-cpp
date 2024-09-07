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
  filterTag?: (version: string) => boolean
  filterName?: (asset: string) => boolean
}

/**
 * Match the asset that matches the version and given keywords
 */
export function matchAsset(
  assets: Assets,
  opts: MatchAssetOpts,
): { tag: string; name: string } {
  // get the list of versions
  let tags = Object.keys(assets)

  // filter the versions
  if (opts.filterTag !== undefined) {
    tags = tags.filter(opts.filterTag)
  }

  if (tags.length === 0) {
    throw new Error(`no tag found for version ${opts.version}`)
  }

  // find the first tag that starts with the version
  // loop over the versions starting with the latest
  let tag: string | undefined
  for (const mingwVersion of tags) {
    if (mingwVersion.startsWith(opts.version)) {
      tag = mingwVersion
      break
    }
  }
  if (tag === undefined) {
    throw new Error(`version ${opts.version} is not supported`)
  }

  // get the list of assets
  let matchedNames = assets[tag]

  // filter the assets
  if (opts.filterName !== undefined) {
    matchedNames = matchedNames.filter(opts.filterName)
  }

  if (matchedNames.length === 0) {
    throw new Error(`no asset found for version ${opts.version}`)
  }

  if (opts.keywords?.length === 0) {
    return { tag, name: matchedNames[0] }
  }

  // find the first asset that matches the keywords
  for (const name of matchedNames) {
    if (opts.keywords!.every((keyword) => name.includes(keyword))) {
      return { tag, name }
    }
  }

  throw new Error(
    `Could not find a matching asset for version ${opts.version} and keywords ${JSON.stringify(opts.keywords)} among ${
      JSON.stringify(matchedNames)
    }`,
  )
}
