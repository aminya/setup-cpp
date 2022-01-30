import { extractZip, extractTar } from "@actions/tool-cache"
import semverLte from "semver/functions/lte"
import semverCoerce from "semver/functions/coerce"
import { setupBin, PackageInfo, InstallationInfo } from "../utils/setup/setupBin"
import { addBinExtension } from "../utils/extension/extension"

/** Get the platform data for cmake */
function getCmakePackageInfo(version: string, platform: NodeJS.Platform, arch: string): PackageInfo {
  const semVersion = semverCoerce(version) ?? version
  switch (platform) {
    case "win32": {
      const isOld = semverLte(semVersion, "v3.19.6")
      let osArchStr: string
      if (["ia32", "x86", "i386", "x32"].includes(arch)) {
        osArchStr = isOld ? "win32-x86" : "windows-i386"
      } else {
        osArchStr = isOld ? "win64-x64" : "windows-x86_64"
      }
      const folderName = `cmake-${version}-${osArchStr}`
      return {
        binRelativeDir: "bin/",
        binFileName: addBinExtension("cmake"),
        extractedFolderName: folderName,
        extractFunction: extractZip,
        url: `https://github.com/Kitware/CMake/releases/download/v${version}/${folderName}.zip`,
      }
    }
    case "darwin": {
      const isOld = semverLte(semVersion, "v3.19.1")
      const osArchStr = isOld ? "Darwin-x86_64" : "macos-universal"
      const folderName = `cmake-${version}-${osArchStr}`
      return {
        binRelativeDir: "CMake.app/Contents/bin/",
        binFileName: addBinExtension("cmake"),
        extractedFolderName: folderName,
        extractFunction: extractTar,
        url: `https://github.com/Kitware/CMake/releases/download/v${version}/${folderName}.tar.gz`,
      }
    }
    case "linux": {
      const isOld = semverLte(semVersion, "v3.19.8")
      let osArchStr: string
      if (["aarch64"].includes(arch)) {
        osArchStr = isOld ? "Linux-aarch64" : "linux-aarch64"
      } else {
        osArchStr = isOld ? "Linux-x86_64" : "linux-x86_64"
      }
      const folderName = `cmake-${version}-${osArchStr}`
      return {
        binRelativeDir: "bin/",
        binFileName: addBinExtension("cmake"),
        extractedFolderName: folderName,
        extractFunction: extractTar,
        url: `https://github.com/Kitware/CMake/releases/download/v${version}/${folderName}.tar.gz`,
      }
    }
    default:
      throw new Error(`Unsupported platform '${platform}'`)
  }
}

/** Setup cmake */
export function setupCmake(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  return setupBin("cmake", version, getCmakePackageInfo, setupDir, arch)
}
