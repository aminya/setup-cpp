import { saveGitHubAssetList } from "../utils/asset/fetch-github-assets.ts"
import { saveHTMLAssets } from "../utils/asset/fetch-html-assets.ts"

/**
 * Generate the list of all releases of a GitHub repository and save it to a json file
 */
async function main() {
  // https://github.com/llvm/llvm-project/releases
  await saveGitHubAssetList(
    "llvm",
    "llvm-project",
    "./src/llvm/github_llvm_llvm-project.json",
    isAssetArchive,
  )

  // go through https://releases.llvm.org/x.y.z and get all the assets
  await saveHTMLAssets({
    htmlDownloadDir: "./src/llvm/assets/",
    path: "./src/llvm/llvm_org_releases.json",
    *getAssetVersionAndURL() {
      for (let major = 1; major <= 9; major++) {
        for (let minor = 0; minor <= 9; minor++) {
          for (let patch = 0; patch <= 9; patch++) {
            const version = (major >= 3 && minor >= 4 && patch >= 1)
              ? `${major}.${minor}`
              : `${major}.${minor}.${patch}`
            yield [version, `https://releases.llvm.org/${version}`] as [string, string]
          }
        }
      }
    },
    filterAssets: isAssetArchive,
  })
}

function isAssetArchive(asset: string): boolean {
  // only download the LLVM and clang+llvm archives
  return (asset.startsWith("LLVM-")
    || asset.startsWith("clang+llvm-")
    || asset.startsWith("clang%2Bllvm-")) // cspell: disable-line
    // only download the archives
    && (asset.endsWith("tar.xz")
      || asset.endsWith("zip")
      || asset.endsWith("exe")
      || asset.endsWith("tar.gz"))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
