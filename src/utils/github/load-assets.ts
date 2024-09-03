import { readFile } from "fs/promises"
import coerce from "semver/functions/coerce.js"

/**
 * The list of assets of a GitHub release
 * @key tag The tag of the release
 * @value assets The names of the assets of the release
 */
export type Assets = Record<string, string[]>

export function compareTag(tag1: string, tag2: string) {
  const v1 = coerce(tag1)
  const v2 = coerce(tag2)
  if (v1 !== null && v2 !== null) {
    // put the latest version first
    return v2.compare(v1)
  }

  // if the tags are not semver, compare them as strings, putting the latest tag first
  return tag2.localeCompare(tag1)
}

export async function loadGitHubAssetList(path: string): Promise<Assets> {
  const data = await readFile(path, "utf-8")
  return JSON.parse(data)
}

type MatchAssetOpts = {
  version: string
  arch?: string
  filterTag?: (version: string) => boolean
  filterName?: (asset: string) => boolean
}

/**
 * Match the asset that matches the version and arch
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
    throw new Error(`no asset found for version ${opts.version} and arch ${opts.arch}`)
  }

  // use the first asset if the arch is not specified
  if (opts.arch === undefined) {
    return { tag, name: matchedNames[0] }
  }

  // find the asset that matches the arch
  for (const name of matchedNames) {
    // search each asset name for the arch
    if (name.includes(opts.arch)) {
      return { tag, name }
    }
  }

  throw new Error(`arch ${opts.arch} could not be found among ${JSON.stringify(matchedNames)}`)
}
