import path, { join } from "path"
import { fileURLToPath } from "url"
import ciInfo from "ci-info"
const { GITHUB_ACTIONS } = ciInfo
import { info } from "ci-log"
import { addEnv, addPath } from "envosman"
import { pathExists } from "path-exists"
import { addExeExt } from "patha"
import semverCoerce from "semver/functions/coerce.js"
import semverSatisfies from "semver/functions/satisfies.js"
import { installAptPack } from "setup-apt"
import { rcOptions } from "../cli-options.js"
import { loadAssetList, matchAsset } from "../utils/asset/load-assets.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { extract7Zip } from "../utils/setup/extract.js"
import { type InstallationInfo, type PackageInfo, setupBin } from "../utils/setup/setupBin.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"
import { addGccLoggingMatcher } from "./gccMatcher.js"

const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export async function setupMingw(version: string, setupDir: string, arch: string) {
  let installationInfo: InstallationInfo | undefined
  switch (process.platform) {
    case "win32": {
      if (arch === "arm" || arch === "arm64") {
        installationInfo = await setupChocoPack("gcc-arm-embedded", version)
      }
      try {
        installationInfo = await setupBin("g++", version, getMinGWPackageInfo, setupDir, arch)
      } catch (err) {
        info(`Failed to download g++ binary. ${err}. Falling back to chocolatey.`)
        installationInfo = await setupChocoMingw(version, arch)
      }
      break
    }
    case "linux": {
      if (isArch()) {
        installationInfo = await setupPacmanPack("mingw-w64-gcc", version)
      } else if (hasDnf()) {
        installationInfo = await setupDnfPack([{ name: "mingw64-gcc", version }])
      } else if (isUbuntu()) {
        installationInfo = await installAptPack([
          {
            name: "mingw-w64",
            version,
            repository: "ppa:ubuntu-toolchain-r/test",
            key: { key: "1E9377A2BA9EF27F", fileName: "ubuntu-toolchain-r-test.gpg" },
          },
        ])
      } else {
        throw new Error(`Unsupported Linux distro for ${arch}`)
      }
      break
    }
    default: {
      throw new Error(`Unsupported platform for ${arch}`)
    }
  }

  if (installationInfo !== undefined) {
    await activateMinGW(installationInfo.binDir)
  }

  return installationInfo
}

async function setupChocoMingw(version: string, arch: string): Promise<InstallationInfo | undefined> {
  await setupChocoPack("mingw", version)
  let binDir: string | undefined
  if (arch === "x64" && (await pathExists("C:/tools/mingw64/bin"))) {
    binDir = "C:/tools/mingw64/bin"
    await addPath(binDir, rcOptions)
  } else if (arch === "ia32" && (await pathExists("C:/tools/mingw32/bin"))) {
    binDir = "C:/tools/mingw32/bin"
    await addPath(binDir, rcOptions)
  } else if (await pathExists(`${process.env.ChocolateyInstall ?? "C:/ProgramData/chocolatey"}/bin/g++.exe`)) {
    binDir = `${process.env.ChocolateyInstall ?? "C:/ProgramData/chocolatey"}/bin`
  }
  if (binDir !== undefined) {
    return { binDir }
  }
  return undefined
}

export async function getMinGWPackageInfo(
  version: string,
  platform: NodeJS.Platform,
  arch: string,
): Promise<PackageInfo> {
  if (platform !== "win32") {
    throw new Error(`Unsupported platform '${platform}'`)
  }

  const mingwAssets = await loadAssetList(
    join(dirname, "github_brechtsanders_winlibs_mingw.json"),
  )

  const mingwArchMap = {
    x64: "x86_64",
    ia32: "i386",
  } as Record<string, string | undefined>

  const runtime = extractMinGWRuntime(version)
  const threadModel = extractMinGWThreadModel(version)
  const exceptionModel = extractMingwExceptionModel(version)

  const asset = matchAsset(
    mingwAssets,
    {
      version,
      keywords: [
        mingwArchMap[arch] ?? arch,
      ],
      filterName: (assetName) => {
        return (runtime === undefined || runtime === extractMinGWRuntime(assetName))
          && (threadModel === undefined || threadModel === extractMinGWThreadModel(assetName))
          && (exceptionModel === undefined || exceptionModel === extractMingwExceptionModel(assetName))
      },
      versionSatisfies: (assetVersion, versionRange) => {
        // extract the base version by coercing the version
        const assetCoerce = semverCoerce(assetVersion)
        if (assetCoerce === null) {
          throw new Error(`Invalid MinGW asset version: '${assetVersion}'`)
        }

        // if the asset version is satisfied by the version
        // and the runtime and thread model match or not specified
        return semverSatisfies(assetCoerce, versionRange)
          && (runtime === undefined || runtime === extractMinGWRuntime(assetVersion))
          && (threadModel === undefined || threadModel === extractMinGWThreadModel(assetVersion))
      },
    },
  )

  if (asset === undefined) {
    throw new Error(`No asset found for version ${version} and arch ${arch}`)
  }

  return {
    binRelativeDir: "bin/",
    binFileName: addExeExt("g++"),
    extractedFolderName: "mingw64",
    extractFunction: extract7Zip,
    url: `https://github.com/brechtsanders/winlibs_mingw/releases/download/${asset.tag}/${asset.name}`,
  }
}

/**
 * Extract the runtime used by the MinGW asset/version
 * @param input The input to extract the runtime from
 *
 * @example
 * extractMinGWRuntime("14.2.0posix-18.1.8-12.0.0-ucrt-r1") // "ucrt"
 * extractMinGWRuntime("10.5.0-11.0.1-msvcrt-r2") // "msvcrt"
 * extractMinGWRuntime("11.1.0-12.0.0-9.0.0-r1") // undefined
 */
function extractMinGWRuntime(input: string) {
  const match = input.match(/(ucrt|msvcrt)/)
  return match !== null ? match[1] : undefined
}

/**
 * Extract the thread model used by the MinGW asset/version
 * @param input The input to extract the thread model from
 *
 * @example
 * extractMinGWThreadModel("14.2.0posix-18.1.8-12.0.0-ucrt-r1") // "posix"
 * extractMinGWThreadModel("14.2.0mcf-12.0.0-ucrt-r1") // "mcf"
 * extractMinGWThreadModel("10.5.0-11.0.1-msvcrt-r2") // undefined
 * extractMinGWThreadModel("11.1.0-12.0.0-9.0.0-r1") // undefined
 */
function extractMinGWThreadModel(input: string) {
  const match = input.match(/(posix|mcf)/)
  return match !== null ? match[1] : undefined
}

/**
 * Extract the exception model used by the MinGW asset/version
 *
 * @param input The input to extract the exception model from
 *
 * @example
 * extractMingwExceptionModel("14.2.0posix-18.1.8-12.0.0-ucrt-r1") // "seh"
 * extractMingwExceptionModel("14.2.0mcf-12.0.0-ucrt-r1") // undefined
 * extractMingwExceptionModel("10.5.0-11.0.1-msvcrt-r2") // "dwarf"
 */
function extractMingwExceptionModel(input: string) {
  const match = input.match(/(seh|dwarf)/)
  return match !== null ? match[1] : undefined
}

async function activateMinGW(binDir: string) {
  const promises: Promise<void>[] = []

  if (process.platform === "win32") {
    promises.push(
      addEnv("CC", addExeExt(`${binDir}/gcc`), rcOptions),
      addEnv("CXX", addExeExt(`${binDir}/g++`), rcOptions),
    )
  }

  // TODO add update-alternatives for Ubuntu
  // Setting up g++-mingw-w64-i686-win32 (10.3.0-14ubuntu1+24.3) ...
  // update-alternatives: using /usr/bin/i686-w64-mingw32-g++-win32 to provide /usr/bin/i686-w64-mingw32-g++ (i686-w64-mingw32-g++) in auto mode
  // Setting up g++-mingw-w64-x86-64-win32 (10.3.0-14ubuntu1+24.3) ...
  // update-alternatives: using /usr/bin/x86_64-w64-mingw32-g++-win32 to provide /usr/bin/x86_64-w64-mingw32-g++ (x86_64-w64-mingw32-g++) in auto mode

  if (GITHUB_ACTIONS) {
    await addGccLoggingMatcher()
  }

  await Promise.all(promises)
}
