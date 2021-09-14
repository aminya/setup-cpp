import { extractZip } from "@actions/tool-cache"
import { setupBin, PackageInfo } from "../utils/setup/setupBin"

/** Get the platform name Ninja uses in their download links */
function getNinjaPlatform(platform: NodeJS.Platform) {
  switch (platform) {
    case "win32":
      return "win"
    case "darwin":
      return "mac"
    case "linux":
      return "linux"
    default:
      throw new Error(`Unsupported platform '${platform}'`)
  }
}

/** Get the platform data for ninja */
function getNinjaPackageInfo(version: string, platform: NodeJS.Platform): PackageInfo {
  const ninjaPlatform = getNinjaPlatform(platform)
  return {
    binRelativeDir: "",
    extractedFolderName: "",
    extractFunction: extractZip,
    url: `https://github.com/ninja-build/ninja/releases/download/v${version}/ninja-${ninjaPlatform}.zip`,
  }
}

export function setupNinja(version: string, setupCppDir: string): Promise<string> {
  return setupBin("ninja", version, getNinjaPackageInfo, setupCppDir)
}
