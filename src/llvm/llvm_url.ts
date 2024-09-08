import path, { join } from "path"
import { fileURLToPath } from "url"
import { info } from "ci-log"
import { addExeExt } from "patha"
import { loadAssetList, matchAsset } from "../utils/asset/load-assets.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { ubuntuVersion } from "../utils/env/ubuntu_version.js"
import { extractExe, extractTarByExe } from "../utils/setup/extract.js"
import type { PackageInfo } from "../utils/setup/setupBin.js"

const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export async function getLLVMPackageInfo(
  version: string,
  platform: NodeJS.Platform,
  arch: string,
): Promise<PackageInfo> {
  const url = await getLLVMAssetURL(platform, arch, version)
  info(`Downloading LLVM from ${url}`)

  return {
    url,
    extractedFolderName: "",
    binRelativeDir: "bin",
    binFileName: addExeExt("clang"),
    extractFunction: platform === "win32"
      ? extractExe
      : (file: string, dest: string) => {
        return extractTarByExe(file, dest, 1)
      },
  }
}

export async function getLLVMAssetURL(platform: string, arch: string, version: string) {
  const { keywords, optionalKeywords } = await getAssetKeywords(platform, arch)

  // first check the github releases
  const llvmGitHubAssets = await loadAssetList(
    join(dirname, "github_llvm_llvm-project.json"),
  )
  const ghAsset = matchAsset(
    llvmGitHubAssets,
    {
      version,
      keywords,
      optionalKeywords,
      filterMapTag(tag) {
        return tag.replace(/^llvmorg-/, "")
      },
      filterName(name) {
        return name.startsWith("LLVM-") || name.startsWith("clang+llvm-")
      },
    },
  )

  if (ghAsset !== undefined) {
    return `https://github.com/llvm/llvm-project/releases/download/${ghAsset.tag}/${ghAsset.name}`
  }

  // check the llvm website
  const llvmWebsiteAssets = await loadAssetList(
    join(dirname, "llvm_org_releases.json"),
  )

  const websiteAsset = matchAsset(
    llvmWebsiteAssets,
    {
      version,
      keywords,
      optionalKeywords,
    },
  )

  if (websiteAsset !== undefined) {
    return `https://llvm.org/releases/${websiteAsset.tag}/${websiteAsset.name}`
  }

  throw new Error(`No asset found for version ${version} matching ${keywords} and ${optionalKeywords}`)
}

async function getAssetKeywords(platform: string, arch: string) {
  const keywords: string[] = []
  const optionalKeywords: string[] = []

  switch (platform) {
    case "win32": {
      switch (arch) {
        case "win64":
        case "x64":
        case "amd64":
        case "x86_64":
        case "64":
          keywords.push("win64")
          break
        case "win32":
        case "x86":
        case "i386":
        case "ia32":
        case "32":
          keywords.push("win32")
          break
        case "woa64":
        case "aarch64":
        case "arm64":
        case "arm": {
          keywords.push("woa64")
          break
        }
        default:
          info(`Using arch ${arch} for LLVM`)
          keywords.push(arch)
          break
      }
      break
    }
    case "linux": {
      keywords.push("linux")

      if (isUbuntu()) {
        optionalKeywords.push("ubuntu")

        const ubuntuVer = await ubuntuVersion()
        if (ubuntuVer !== null) {
          optionalKeywords.push(`${ubuntuVer[0]}`)
          const ubuntuMin = ubuntuVer[1] < 10 ? `0${ubuntuVer[1]}` : `${ubuntuVer[1]}`

          optionalKeywords.push(`${ubuntuVer[0]}.${ubuntuMin}`)
          optionalKeywords.push(`${ubuntuVer[0]}.${ubuntuMin}.${ubuntuVer[2]}`)
        }
      } else if (hasDnf()) {
        optionalKeywords.push("rhel")
      }

      switch (arch) {
        case "x86_64":
        case "x64":
        case "amd64":
        case "64":
          keywords.push("x86_64")
          break
        case "x86":
        case "i386":
        case "ia32":
        case "32":
          keywords.push("x86")
          break
        case "aarch64":
        case "arm64":
        case "arm":
          keywords.push("aarch64")
          break
        case "armv7a":
        case "armv7":
          keywords.push("armv7a")
          break
        case "powerpc64le":
        case "ppc64le":
          keywords.push("powerpc64le")
          break
        case "sparc64":
          keywords.push("sparc64")
          break
        default:
          info(`Using arch ${arch} for LLVM`)
          keywords.push(arch)
          break
      }

      break
    }
    case "darwin": {
      keywords.push("apple")

      switch (arch) {
        case "x86_64":
        case "x64":
        case "amd64":
        case "64":
          keywords.push("x86_64")
          break
        case "arm64":
        case "arm":
        case "aarch64":
          // allow falling back to x86_64 if arm64 is not available
          optionalKeywords.push("arm64")
          break
        default:
          info(`Using arch ${arch} for LLVM`)
          keywords.push(arch)
          break
      }
      break
    }
    case "freebsd": {
      keywords.push("freebsd")

      switch (arch) {
        case "x86_64":
        case "x64":
        case "amd64":
        case "64":
          keywords.push("amd64")
          break
        case "x86":
        case "i386":
        case "ia32":
        case "32":
          keywords.push("i386")
          break
        default:
          info(`Using arch ${arch} for LLVM`)
          keywords.push(arch)
          break
      }

      break
    }
    default:
      info(`Using ${platform} ${arch} for LLVM`)
      optionalKeywords.push(platform, arch)
      break
  }
  return { keywords, optionalKeywords }
}
