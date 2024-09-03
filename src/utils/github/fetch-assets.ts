import { Octokit } from "@octokit/rest"
import { writeFile } from "fs/promises"
import JsonStringify from "safe-stable-stringify"
import { compareVersion } from "../setup/version.ts"
import type { Assets } from "./load-assets.ts"

/**
 * Get the list of all releases of a GitHub repository
 * @param owner The owner of the repository
 * @param repo The name of the repository
 * @param prerelease Whether to include prereleases
 */

async function fetchGitHubAssetList(owner: string, repo: string, prerelease = false) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  const assets: Assets = {}

  for (let page = 1; page !== 101; page++) {
    console.log(`Fetching page ${page}`)
    try {
      /* eslint-disable no-await-in-loop */
      const res = await octokit.repos.listReleases({
        owner,
        repo,
        per_page: 100, // maximum supported by GitHub API
        page,
      })

      if (res.data.length === 0) {
        break
      }

      for (const release of res.data) {
        if (release.draft) {
          continue
        }

        if (!prerelease && release.prerelease) {
          continue
        }

        if (!(release.tag_name in assets)) {
          assets[release.tag_name] = []
        }

        const assets_ref = assets[release.tag_name]
        for (const asset of release.assets) {
          assets_ref.push(asset.name)
        }
      }
    } catch (err) {
      console.error(err)
      break
    }
  }

  return assets
}
/**
 * Save the list of all releases of a GitHub repository to a json file
 */

export async function saveGitHubAssetList(
  owner: string,
  repo: string,
  path: string,
) {
  const assets = await fetchGitHubAssetList(owner, repo)

  const jsonStringify = JsonStringify.configure({
    deterministic: compareVersion,
  })
  const data = jsonStringify(assets)

  // write the assets to a json file
  await writeFile(path, data)
}
