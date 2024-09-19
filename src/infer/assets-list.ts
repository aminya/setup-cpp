import { saveGitHubAssetList } from "../utils/asset/fetch-github-assets.ts"

/**
 * Generate the list of all releases of a GitHub repository and save it to a json file
 */
async function main() {
  // https://github.com/facebook/infer/releases
  await saveGitHubAssetList(
    "facebook",
    "infer",
    "./src/infer/github_facebook_infer.json",
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
