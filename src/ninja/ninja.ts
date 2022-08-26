import { addExeExt } from "patha"
import { extractZip } from "../utils/setup/extract"
import { setupBin, PackageInfo, InstallationInfo } from "../utils/setup/setupBin"

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getNinjaPackageInfo(version: string, platform: NodeJS.Platform, _arch: string): PackageInfo {
  const ninjaPlatform = getNinjaPlatform(platform)
  return {
    binRelativeDir: "",
    binFileName: addExeExt("ninja"),
    extractedFolderName: "",
    extractFunction: extractZip,
    url: `https://github.com/ninja-build/ninja/releases/download/v${version}/ninja-${ninjaPlatform}.zip`,
  }
}

export function setupNinja(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  return setupBin("ninja", version, getNinjaPackageInfo, setupDir, arch)
}
