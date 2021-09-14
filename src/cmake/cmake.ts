import { extractZip, extractTar, find, downloadTool, cacheDir } from "@actions/tool-cache"
import { getInput, addPath, group, startGroup, endGroup } from "@actions/core"
import { join, basename } from "path"
import { existsSync } from "fs"
import semverLte from "semver/functions/lte"
import semverCoerce from "semver/functions/coerce"
import * as hasha from "hasha"
import { tmpdir } from "os"
import { URL } from "url"

interface PackageInfo {
  url: string
  binRelativePath: string
  extractFunction: {
    (url: string, outputPath: string): Promise<string>
  }
  dropSuffix: string
}

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
        binRelativePath: "bin/",
        dropSuffix: ".zip",
        extractFunction: extractZip,
        url: `https://github.com/Kitware/CMake/releases/download/v${version}/cmake-${version}-${osArchStr}.zip`,
      }
    }
    case "darwin": {
      const isOld = semverLte(semVersion, "v3.19.1")
      const osArchStr = isOld ? "Darwin-x86_64" : "macos-universal"
      return {
        binRelativePath: "CMake.app/Contents/bin/",
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
        binRelativePath: "bin/",
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
export async function setupCmake(version: string): Promise<string> {
  // Build artifact name
  const cmakeBin = process.platform === "win32" ? "cmake.exe" : "cmake"

  // Restore from cache (if found).
  const cmakeDir = find("cmake", version)
  if (cmakeDir) {
    addPath(cmakeDir)
    return join(cmakeDir, cmakeBin)
  }

  const { url, dropSuffix, binRelativePath: binPath, extractFunction } = getCmakePlatformData(version, process.platform)

  // Get an unique output directory name from the URL.
  const key: string = await hasha.async(url)
  const finalDir = join(process.env.RUNNER_TEMP ?? tmpdir(), key)

  const { pathname } = new URL(url)
  const dirName = basename(pathname)
  const finalPath = join(finalDir, dirName.replace(dropSuffix, ""), binPath)

  const finalBinPath = join(finalPath, cmakeBin)

  if (!existsSync(finalDir)) {
    await group("Download and extract CMake", async () => {
      const downloaded = await downloadTool(url)
      await extractFunction(downloaded, finalDir)
    })
  }

  try {
    startGroup(`Add CMake to PATH`)
    addPath(finalPath)
  } finally {
    endGroup()
  }

  await cacheDir(finalDir, "cmake", version)

  return finalBinPath
}
