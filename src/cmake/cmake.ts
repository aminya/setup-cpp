import { extractZip, extractTar } from "@actions/tool-cache"
import { getInput } from "@actions/core"
import semverLte from "semver/functions/lte"
import semverCoerce from "semver/functions/coerce"
import { setupBin, PackageInfo } from "../utils/setup/setup"

/** Get the platform data for cmake */
function getCmakePlatformData(version: string, platform?: NodeJS.Platform): PackageInfo {
  const semVersion = semverCoerce(version) ?? version
  const platformStr = platform ?? process.platform
  const arch = getInput("architecture") || process.arch
  switch (platformStr) {
    case "win32": {
      const isOld = semverLte(semVersion, "v3.19.6")
      let osArchStr: string
      if (["ia32", "x86", "i386", "x32"].includes(arch)) {
        osArchStr = isOld ? "win32-x86" : "windows-i386"
      } else {
        osArchStr = isOld ? "win64-x64" : "windows-x86_64"
      }
      return {
        binRelativeDir: "bin/",
        dropSuffix: ".zip",
        extractFunction: extractZip,
        url: `https://github.com/Kitware/CMake/releases/download/v${version}/cmake-${version}-${osArchStr}.zip`,
      }
    }
    case "darwin": {
      const isOld = semverLte(semVersion, "v3.19.1")
      const osArchStr = isOld ? "Darwin-x86_64" : "macos-universal"
      return {
        binRelativeDir: "CMake.app/Contents/bin/",
        dropSuffix: ".tar.gz",
        extractFunction: extractTar,
        url: `https://github.com/Kitware/CMake/releases/download/v${version}/cmake-${version}-${osArchStr}.tar.gz`,
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
      return {
        binRelativeDir: "bin/",
        dropSuffix: ".tar.gz",
        extractFunction: extractTar,
        url: `https://github.com/Kitware/CMake/releases/download/v${version}/cmake-${version}-${osArchStr}.tar.gz`,
      }
    }
    default:
      throw new Error(`Unsupported platform '${platformStr}'`)
  }
}

/** Setup cmake */
export function setupCmake(version: string): Promise<string> {
  return setupBin("cmake", version, getCmakePlatformData)
}
