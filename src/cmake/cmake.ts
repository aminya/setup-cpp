import { info } from "ci-log"
import { addExeExt } from "patha"
import semverLte from "semver/functions/lte"
import { hasApk, installApkPack } from "setup-alpine"
import type { SetupOptions } from "../setup-options.js"
import { arm64, x86, x86_64 } from "../utils/env/arch.js"
import { type InstallationInfo, type PackageInfo, setupBin } from "../utils/setup/setupBin.js"
import { semverCoerceIfInvalid } from "../utils/setup/version.js"

/** Get the platform data for cmake */
function getCmakePackageInfo(version: string, platform: NodeJS.Platform, arch: string): PackageInfo {
  const semVersion = version === "" ? "" : semverCoerceIfInvalid(version)
  switch (platform) {
    case "win32": {
      const isOld = semVersion === "" ? false : semverLte(semVersion, "v3.19.6")
      let osArchStr: string
      if (x86_64.includes(arch)) {
        osArchStr = isOld ? "win64-x64" : "windows-x86_64"
      } else if (x86.includes(arch)) {
        osArchStr = isOld ? "win32-x86" : "windows-i386"
      } else if (arm64.includes(arch)) {
        osArchStr = "windows-arm64"
      } else {
        info(`Trying unsupported arch '${arch}' for cmake on Windows`)
        osArchStr = `windows-${arch}`
      }
      const folderName = `cmake-${version}-${osArchStr}`
      return {
        binRelativeDir: "bin/",
        binFileName: addExeExt("cmake"),
        extractedFolderName: folderName,
        url: `https://github.com/Kitware/CMake/releases/download/v${version}/${folderName}.zip`,
      }
    }
    case "darwin": {
      const isOld = semVersion === "" ? false : semverLte(semVersion, "v3.19.1")
      const osArchStr = isOld ? "Darwin-x86_64" : "macos-universal"
      const folderName = `cmake-${version}-${osArchStr}`
      return {
        binRelativeDir: "CMake.app/Contents/bin/",
        binFileName: addExeExt("cmake"),
        extractedFolderName: folderName,
        url: `https://github.com/Kitware/CMake/releases/download/v${version}/${folderName}.tar.gz`,
      }
    }
    case "linux": {
      const isOld = semVersion === "" ? false : semverLte(semVersion, "v3.19.8")
      let osArchStr: string
      if (arm64.includes(arch)) {
        osArchStr = isOld ? "Linux-aarch64" : "linux-aarch64"
      } else if (x86_64.includes(arch)) {
        osArchStr = isOld ? "Linux-x86_64" : "linux-x86_64"
      } else {
        info(`Trying unsupported arch '${arch}' for cmake on Linux`)
        osArchStr = `linux-${arch}`
      }
      const folderName = `cmake-${version}-${osArchStr}`
      return {
        binRelativeDir: "bin/",
        binFileName: addExeExt("cmake"),
        extractedFolderName: folderName,
        url: `https://github.com/Kitware/CMake/releases/download/v${version}/${folderName}.tar.gz`,
      }
    }
    default:
      throw new Error(`Unsupported platform '${platform}'`)
  }
}

/** Setup cmake */
export async function setupCmake({ version, setupDir, arch }: SetupOptions): Promise<InstallationInfo> {
  if (await hasApk()) {
    return installApkPack([
      {
        name: "cmake",
        // version,
      },
    ])
  }

  return setupBin("cmake", version, getCmakePackageInfo, setupDir, arch)
}
