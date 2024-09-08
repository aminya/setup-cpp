import { saveGitHubAssetList } from "../utils/asset/fetch-github-assets.ts"

/**
 * Generate the list of all releases of a GitHub repository and save it to a json file
 */
async function main() {
  // https://github.com/brechtsanders/winlibs_mingw/releases
  await saveGitHubAssetList(
    "brechtsanders",
    "winlibs_mingw",
    "./src/gcc/github_brechtsanders_winlibs_mingw.json",
    (asset) => asset.endsWith(".7z"),
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
