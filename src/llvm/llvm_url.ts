import path, { join } from "path"
import { fileURLToPath } from "url"
import { info } from "ci-log"
import { addExeExt } from "patha"
import { loadAssetList, matchAsset } from "../utils/asset/load-assets.js"
import { arm64, armv7, powerpc64le, sparc64, sparcv9, x86, x86_64 } from "../utils/env/arch.js"
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
    return `https://releases.llvm.org/${websiteAsset.tag}/${websiteAsset.name}`
  }

  throw new Error(`No asset found for version ${version} matching ${keywords} and ${optionalKeywords}`)
}

async function getAssetKeywords(platform: string, arch: string) {
  const keywords: (string | string[])[] = []
  const optionalKeywords: (string | string[])[] = []

  switch (platform) {
    case "win32": {
      const osKeywordsChoice: string[] = ["windows", "Windows"]
      if (x86_64.includes(arch)) {
        osKeywordsChoice.push("win64", "win64", "win64")
        optionalKeywords.push(["x86_64", "X64"])
        // TODO fallback to win32 if win64 is not available (e.g. for LLVM 3.6.2 and older)
      } else if (x86.includes(arch)) {
        osKeywordsChoice.push("win32")
      } else if (arm64.includes(arch)) {
        osKeywordsChoice.push("woa64")
      } else {
        info(`Using arch ${arch} for LLVM`)
        osKeywordsChoice.push(arch)
      }
      keywords.push(osKeywordsChoice)
      break
    }
    case "linux": {
      const osKeywordsChoice = ["linux", "Linux"]

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

      if (x86_64.includes(arch)) {
        keywords.push(["x86_64", "X64"])
      } else if (x86.includes(arch)) {
        keywords.push("x86")
      } else if (arm64.includes(arch)) {
        keywords.push("aarch64")
      } else if (armv7.includes(arch)) {
        keywords.push("armv7a")
      } else if (powerpc64le.includes(arch)) {
        keywords.push("powerpc64le")
      } else if (sparc64.includes(arch)) {
        keywords.push("sparc64")
      } else {
        info(`Using arch ${arch} for LLVM`)
        keywords.push(arch)
      }
      keywords.push(osKeywordsChoice)
      break
    }
    case "darwin": {
      keywords.push(["apple", "macos", "macOS"])

      if (x86_64.includes(arch)) {
        optionalKeywords.push(["x86_64", "X64"])
      } else if (arm64.includes(arch)) {
        // allow falling back to x86_64 if arm64 is not available
        optionalKeywords.push(["arm64", "ARM64"])
      } else {
        info(`Using arch ${arch} for LLVM`)
        keywords.push(arch)
      }
      break
    }
    case "freebsd": {
      keywords.push("freebsd")

      if (x86_64.includes(arch)) {
        keywords.push("amd64")
      } else if (x86.includes(arch)) {
        keywords.push("i386")
      } else {
        info(`Using arch ${arch} for LLVM`)
        keywords.push(arch)
      }

      break
    }
    case "solaris": {
      keywords.push("solaris")

      if (x86_64.includes(arch)) {
        keywords.push("amd64")
      } else if (sparcv9.includes(arch)) {
        keywords.push("sparcv9")
      } else {
        info(`Using arch ${arch} for LLVM`)
        keywords.push(arch)
      }

      break
    }
    default:
      info(`Using ${platform} ${arch} for LLVM`)
      keywords.push(platform, arch)
      break
  }
  return { keywords, optionalKeywords }
}
