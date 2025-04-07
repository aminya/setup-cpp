import { addPath } from "envosman"
import { addExeExt } from "patha"
import { enableCommunityRepository, hasApk, installApkPack } from "setup-alpine"
import { rcOptions } from "../options.js"
import { arm64, x86, x86_64 } from "../utils/env/arch.js"
import { type InstallationInfo, type PackageInfo, setupBin } from "../utils/setup/setupBin.js"

/** Get the platform name Ninja uses in their download links */
function getNinjaPlatformArch(platform: NodeJS.Platform, arch: string) {
  switch (platform) {
    case "win32":
      return x86_64.includes(arch)
          || x86.includes(arch)
        ? "win"
        : arm64.includes(arch)
        ? "winarm64"
        : "win"
    case "darwin":
      return "mac"
    case "linux":
      return x86_64.includes(arch)
          || x86.includes(arch)
        ? "linux"
        : arm64.includes(arch)
        ? "linux-aarch64"
        : "linux"
    default:
      throw new Error(`Unsupported platform '${platform}'`)
  }
}

/** Get the platform data for ninja */
function getNinjaPackageInfo(version: string, platform: NodeJS.Platform, arch: string): PackageInfo {
  const ninjaPlatform = getNinjaPlatformArch(platform, arch)
  return {
    binRelativeDir: "",
    binFileName: addExeExt("ninja"),
    extractedFolderName: "",
    url: `https://github.com/ninja-build/ninja/releases/download/v${version}/ninja-${ninjaPlatform}.zip`,
  }
}

export async function setupNinja(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  if (await hasApk()) {
    await enableCommunityRepository()
    await installApkPack([
      {
        name: "ninja-build",
        // version,
      },
      {
        name: "ninja-is-really-ninja",
      },
    ])
    await addPath("/usr/lib/ninja-build/bin", rcOptions)
    return {
      binDir: "/usr/lib/ninja-build/bin",
      installDir: "/usr/lib/ninja-build/",
      bin: "/usr/lib/ninja-build/bin/ninja",
    }
  }

  return setupBin("ninja", version, getNinjaPackageInfo, setupDir, arch)
}
