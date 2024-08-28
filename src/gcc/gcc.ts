import { addEnv, addPath } from "envosman"

import { GITHUB_ACTIONS } from "ci-info"
import { info, warning } from "ci-log"
import type { ExecaReturnValue } from "execa"
import { pathExists } from "path-exists"
import { addExeExt, join } from "patha"
import semverCoerce from "semver/functions/coerce"
import semverMajor from "semver/functions/major"
import { addUpdateAlternativesToRc, installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { rcOptions } from "../cli-options.js"
import { setupMacOSSDK } from "../macos-sdk/macos-sdk.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { extract7Zip } from "../utils/setup/extract.js"
import { type InstallationInfo, type PackageInfo, setupBin } from "../utils/setup/setupBin.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

interface MingwInfo {
  releaseName: string
  fileSuffix: string
}

// https://github.com/brechtsanders/winlibs_mingw/releases
const GccToMingwInfo = {
  "13": { releaseName: "13.2.0-16.0.6-11.0.0-ucrt-r1", fileSuffix: "13.2.0-mingw-w64ucrt-11.0.0-r1" },
  "13.2-ucrt": { releaseName: "13.2.0-16.0.6-11.0.0-ucrt-r1", fileSuffix: "13.2.0-mingw-w64ucrt-11.0.0-r1" },
  "13.2-ucrt-mcf": { releaseName: "13.2.0mcf-16.0.6-11.0.1-ucrt-r2", fileSuffix: "13.2.0-mingw-w64ucrt-11.0.1-r2" },
  "13.2-msvcrt": { releaseName: "13.2.0-16.0.6-11.0.1-msvcrt-r1", fileSuffix: "13.2.0-mingw-w64msvcrt-11.0.1-r1" },
  "13.1-ucrt": { releaseName: "13.1.0posix-16.0.3-11.0.0-ucrt-r1", fileSuffix: "13.1.0-mingw-w64ucrt-11.0.0-r1" },
  "13.1-msvcrt": { releaseName: "13.1.0posix-16.0.3-11.0.0-msvcrt-r1", fileSuffix: "13.1.0-mingw-w64msvcrt-11.0.0-r1" },
  "12": { releaseName: "12.3.0-16.0.4-11.0.0-ucrt-r1", fileSuffix: "12.3.0-mingw-w64ucrt-11.0.0-r1" },
  "12.3.0-ucrt": { releaseName: "12.3.0-16.0.4-11.0.0-ucrt-r1", fileSuffix: "12.3.0-mingw-w64ucrt-11.0.0-r1" },
  "12.3.0-msvcrt": { releaseName: "12.3.0-16.0.4-11.0.0-msvcrt-r1", fileSuffix: "12.3.0-mingw-w64msvcrt-11.0.0-r1" },
  "12.2.0-ucrt": { releaseName: "12.2.0-14.0.6-10.0.0-ucrt-r2", fileSuffix: "12.2.0-mingw-w64ucrt-10.0.0-r2" },
  "12.2.0-msvcrt": { releaseName: "12.2.0-14.0.6-10.0.0-msvcrt-r2", fileSuffix: "12.2.0-mingw-w64msvcrt-10.0.0-r2" },
  "12.1.0-ucrt": { releaseName: "12.1.0-14.0.4-10.0.0-ucrt-r2", fileSuffix: "12.1.0-mingw-w64ucrt-10.0.0-r2" },
  "12.1.0-msvcrt": {
    releaseName: "12.1.0-14.0.6-10.0.0-msvcrt-r3",
    fileSuffix: "12.1.0-llvm-14.0.6-mingw-w64msvcrt-10.0.0-r3",
  },
  "11": { releaseName: "11.3.0-14.0.3-10.0.0-ucrt-r3", fileSuffix: "11.3.0-mingw-w64ucrt-10.0.0-r3" },
  "11.3.0-ucrt": { releaseName: "11.3.0-14.0.3-10.0.0-ucrt-r3", fileSuffix: "11.3.0-mingw-w64ucrt-10.0.0-r3" },
  "11.3.0-msvcrt": { releaseName: "11.3.0-14.0.3-10.0.0-msvcrt-r3", fileSuffix: "11.3.0-mingw-w64msvcrt-10.0.0-r3" },
  "11.2.0-ucrt": { releaseName: "11.2.0-9.0.0-ucrt-r5", fileSuffix: "11.2.0-mingw-w64ucrt-9.0.0-r5" },
  "11.2.0-msvcrt": { releaseName: "11.2.0-9.0.0-msvcrt-r5", fileSuffix: "11.2.0-mingw-w64msvcrt-9.0.0-r5" },
  "10": { releaseName: "10.5.0-11.0.1-msvcrt-r1", fileSuffix: "10.5.0-mingw-w64msvcrt-11.0.1-r1" },
  "10.5.0-msvcrt": { releaseName: "10.5.0-11.0.1-msvcrt-r1", fileSuffix: "10.5.0-mingw-w64msvcrt-11.0.1-r1" },
  "10.3.0": { releaseName: "10.3.0-12.0.0-9.0.0-r2", fileSuffix: "10.3.0-llvm-12.0.0-mingw-w64-9.0.0-r2" },
  "10.2.0": { releaseName: "10.2.0-7.0.0-r4", fileSuffix: "10.2.0-llvm-10.0.1-mingw-w64-7.0.0-r4" },
  "9": { releaseName: "9.4.0-9.0.0-r1", fileSuffix: "9.4.0-mingw-w64-9.0.0-r1" },
  "9.4.0": { releaseName: "9.4.0-9.0.0-r1", fileSuffix: "9.4.0-mingw-w64-9.0.0-r1" },
} as Record<string, MingwInfo | undefined>

function getGccPackageInfo(version: string, platform: NodeJS.Platform, arch: string): PackageInfo {
  switch (platform) {
    case "win32": {
      const mingwInfo = GccToMingwInfo[version]
      if (mingwInfo === undefined) {
        throw new Error(`mingw version ${version} is not supported`)
      }
      const mingwArch = arch === "ia32" ? "i686" : "x86_64"
      const exceptionModel: "seh" | "dwarf" = "seh" // SEH is native windows exception model https://github.com/brechtsanders/winlibs_mingw/issues/4#issuecomment-599296483
      return {
        binRelativeDir: "bin/",
        binFileName: addExeExt("g++"),
        extractedFolderName: "mingw64",
        extractFunction: extract7Zip,
        url:
          `https://github.com/brechtsanders/winlibs_mingw/releases/download/${mingwInfo.releaseName}/winlibs-${mingwArch}-posix-${exceptionModel}-gcc-${mingwInfo.fileSuffix}.7z`,
      }
    }
    default:
      throw new Error(`Unsupported platform '${platform}'`)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupGcc(version: string, setupDir: string, arch: string, priority: number = 40) {
  let installationInfo: InstallationInfo | undefined
  switch (process.platform) {
    case "win32": {
      if (arch === "arm" || arch === "arm64") {
        await setupChocoPack("gcc-arm-embedded", version)
      }
      try {
        installationInfo = await setupBin("g++", version, getGccPackageInfo, setupDir, arch)
      } catch (err) {
        info(`Failed to download g++ binary. ${err}. Falling back to chocolatey.`)
        installationInfo = await setupChocoMingw(version, arch)
      }
      break
    }
    case "darwin": {
      installationInfo = await installBrewPack("gcc", version)
      break
    }
    case "linux": {
      if (arch === "x64") {
        if (isArch()) {
          installationInfo = await setupPacmanPack("gcc", version)
        } else if (hasDnf()) {
          installationInfo = await setupDnfPack([
            { name: "gcc", version },
            { name: "gcc-c++", version },
            { name: "libstdc++-devel" },
          ])
        } else if (isUbuntu()) {
          installationInfo = await installAptPack([
            {
              name: "gcc",
              version,
              repository: "ppa:ubuntu-toolchain-r/test",
              key: { key: "1E9377A2BA9EF27F", fileName: "ubuntu-toolchain-r-test.gpg" },
            },
            {
              name: "g++",
              version,
              repository: "ppa:ubuntu-toolchain-r/test",
              key: { key: "1E9377A2BA9EF27F", fileName: "ubuntu-toolchain-r-test.gpg" },
            },
          ])
        }
      } else {
        info(`Install g++-multilib because gcc for ${arch} was requested`)
        if (isArch()) {
          await setupPacmanPack("gcc-multilib", version)
        } else if (isUbuntu()) {
          await installAptPack([{
            name: "gcc-multilib",
            version,
            repository: "ppa:ubuntu-toolchain-r/test",
            key: { key: "1E9377A2BA9EF27F", fileName: "ubuntu-toolchain-r-test.gpg" },
          }])
        }
      }
      break
    }
    // TODO support bare-metal (need to support passing it as the input)
    // TODO support abi
    // case "none": {
    //   if (arch === "arm" || arch === "arm64") {
    //     return installAptPack("gcc-arm-none-eabi", version, [
    //       "ppa:ubuntu-toolchain-r/test",
    //     ])
    //   } else {
    //     throw new Error(`Unsupported platform for ${arch}`)
    //   }
    // }
    default: {
      throw new Error(`Unsupported platform for ${arch}`)
    }
  }
  if (installationInfo !== undefined) {
    await activateGcc(version, installationInfo.binDir, priority)
    return installationInfo
  }
  return undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupMingw(version: string, setupDir: string, arch: string) {
  let installationInfo: InstallationInfo | undefined
  switch (process.platform) {
    case "win32":
    case "darwin": {
      return setupGcc(version, setupDir, arch)
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
      }
      break
    }
    default: {
      throw new Error(`Unsupported platform for ${arch}`)
    }
  }
  if (installationInfo !== undefined) {
    // TODO: setup alternatives and update CC/CXX env. ?
    // Setting up g++-mingw-w64-i686-win32 (10.3.0-14ubuntu1+24.3) ...
    // update-alternatives: using /usr/bin/i686-w64-mingw32-g++-win32 to provide /usr/bin/i686-w64-mingw32-g++ (i686-w64-mingw32-g++) in auto mode
    // Setting up g++-mingw-w64-x86-64-win32 (10.3.0-14ubuntu1+24.3) ...
    // update-alternatives: using /usr/bin/x86_64-w64-mingw32-g++-win32 to provide /usr/bin/x86_64-w64-mingw32-g++ (x86_64-w64-mingw32-g++) in auto mode
    // await activateGcc(version, installationInfo.binDir)
    return installationInfo
  }
  return undefined
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

async function activateGcc(version: string, binDir: string, priority: number = 40) {
  const promises: Promise<void | ExecaReturnValue<string>>[] = []
  // Setup gcc as the compiler

  // TODO
  // const ld = process.env.LD_LIBRARY_PATH ?? ""
  // const dyld = process.env.DYLD_LIBRARY_PATH ?? ""
  // promises.push(
  //   addEnv("LD_LIBRARY_PATH", `${installDir}/lib${path.delimiter}${ld}`, rcOptions),
  //   addEnv("DYLD_LIBRARY_PATH", `${installDir}/lib${path.delimiter}${dyld}`, rcOptions),
  //   addEnv("CPATH", `${installDir}/lib/gcc/${majorVersion}/include`, rcOptions),
  //   addEnv("LDFLAGS", `-L${installDir}/lib`, rcOptions),
  //   addEnv("CPPFLAGS", `-I${installDir}/include`, rcOptions),
  // )

  if (process.platform === "win32") {
    promises.push(
      addEnv("CC", addExeExt(`${binDir}/gcc`), rcOptions),
      addEnv("CXX", addExeExt(`${binDir}/g++`), rcOptions),
    )
  } else {
    const majorVersion = semverMajor(semverCoerce(version) ?? version)
    if (majorVersion >= 5) {
      promises.push(
        addEnv("CC", `${binDir}/gcc-${majorVersion}`, rcOptions),
        addEnv("CXX", `${binDir}/g++-${majorVersion}`, rcOptions),
      )

      if (isUbuntu()) {
        promises.push(
          addUpdateAlternativesToRc("cc", `${binDir}/gcc-${majorVersion}`, rcOptions, priority),
          addUpdateAlternativesToRc("cxx", `${binDir}/g++-${majorVersion}`, rcOptions, priority),
          addUpdateAlternativesToRc("gcc", `${binDir}/gcc-${majorVersion}`, rcOptions, priority),
          addUpdateAlternativesToRc("g++", `${binDir}/g++-${majorVersion}`, rcOptions, priority),
        )
      }
    } else {
      promises.push(
        addEnv("CC", `${binDir}/gcc-${version}`, rcOptions),
        addEnv("CXX", `${binDir}/g++-${version}`, rcOptions),
      )

      if (isUbuntu()) {
        promises.push(
          addUpdateAlternativesToRc("cc", `${binDir}/gcc-${version}`, rcOptions, priority),
          addUpdateAlternativesToRc("cxx", `${binDir}/g++-${version}`, rcOptions, priority),
          addUpdateAlternativesToRc("gcc", `${binDir}/gcc-${version}`, rcOptions, priority),
          addUpdateAlternativesToRc("g++", `${binDir}/g++-${version}`, rcOptions, priority),
        )
      }
    }
  }

  promises.push(setupMacOSSDK())

  if (GITHUB_ACTIONS) {
    await addGccLoggingMatcher()
  }

  await Promise.all(promises)
}

async function addGccLoggingMatcher() {
  const matcherPath = join(__dirname, "gcc_matcher.json")
  if (!(await pathExists(matcherPath))) {
    return warning("the gcc_matcher.json file does not exist in the same folder as setup-cpp.js")
  }
  info(`::add-matcher::${matcherPath}`)
}
