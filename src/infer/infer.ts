import path, { basename, join } from "path"
import { fileURLToPath } from "url"
import { info } from "ci-log"
import { addExeExt } from "patha"
import { loadAssetList, matchAsset } from "../utils/asset/load-assets.js"
import { arm64, x86_64 } from "../utils/env/arch.js"
import { type InstallationInfo, type PackageInfo, setupBin } from "../utils/setup/setupBin.js"

const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

/** Get the platform data for infer */
async function getInferPackageInfo(version: string, platform: NodeJS.Platform, arch: string): Promise<PackageInfo> {
  const { keywords, optionalKeywords } = getAssetKeywords(platform, arch)

  // first check the github releases
  const inferGitHubAssets = await loadAssetList(
    join(dirname, "github_facebook_infer.json"),
  )
  const ghAsset = matchAsset(
    inferGitHubAssets,
    {
      version,
      keywords,
      optionalKeywords,
      filterMapTag(tag) {
        return tag.replace(/^v/, "")
      },
    },
  )

  if (ghAsset !== undefined) {
    return {
      url: `https://github.com/facebook/infer/releases/download/${ghAsset.tag}/${ghAsset.name}`,
      extractedFolderName: `${basename(ghAsset.name, ".tar.xz")}`,
      binRelativeDir: "bin",
      binFileName: addExeExt("infer"),
    }
  }

  throw new Error(`No asset found for version ${version} matching ${keywords} and ${optionalKeywords}`)
}

/** Setup infer */
export function setupInfer(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  return setupBin("infer", version, getInferPackageInfo, setupDir, arch)
}

function getAssetKeywords(platform: string, arch: string) {
  const keywords: string[] = []
  const optionalKeywords: string[] = []

  switch (platform) {
    case "linux": {
      keywords.push("linux")

      if (x86_64.includes(arch)) {
        optionalKeywords.push("64")
        optionalKeywords.push("x86_64")
      } else {
        info(`Using arch ${arch} for infer`)
        keywords.push(arch)
      }
      break
    }
    case "darwin": {
      keywords.push("osx")

      if (x86_64.includes(arch)) {
        optionalKeywords.push("x86_64")
      } else if (arm64.includes(arch)) {
        // allow falling back to x86_64 if arm64 is not available
        optionalKeywords.push("arm64")
      } else {
        info(`Using arch ${arch} for infer`)
        keywords.push(arch)
      }
      break
    }
    default:
      info(`Using ${platform} ${arch} for infer`)
      keywords.push(platform, arch)
      break
  }
  return { keywords, optionalKeywords }
}
