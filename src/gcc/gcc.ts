import { addEnv, addPath } from "envosman"

import { GITHUB_ACTIONS } from "ci-info"
import { error, info, warning } from "ci-log"
import { type ExecaReturnValue, execa } from "execa"
import { readdir } from "fs/promises"
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
import { loadGitHubAssetList, matchAsset } from "../utils/github/load-assets.js"
import { extract7Zip } from "../utils/setup/extract.js"
import { type InstallationInfo, type PackageInfo, setupBin } from "../utils/setup/setupBin.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

async function getGccPackageInfo(version: string, platform: NodeJS.Platform, arch: string): Promise<PackageInfo> {
  switch (platform) {
    case "win32": {
      const mingwAssets = await loadGitHubAssetList(
        join(__dirname, "github_brechtsanders_winlibs_mingw.json"),
      )
      const asset = matchAsset(
        mingwAssets,
        {
          version,
          arch: arch === "x64"
            ? "x86_64"
            : arch === "ia32"
            ? "i386"
            : arch,
          filterName: (name) => name.endsWith(".7z"),
        },
      )

      return {
        binRelativeDir: "bin/",
        binFileName: addExeExt("g++"),
        extractedFolderName: "mingw64",
        extractFunction: extract7Zip,
        url: `https://github.com/brechtsanders/winlibs_mingw/releases/download/${asset.tag}/${asset.name}`,
      }
    }
    default:
      throw new Error(`Unsupported platform '${platform}'`)
  }
}

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
          if (version === "") {
            // the default version
            installationInfo = await installAptPack([{ name: "gcc" }, { name: "g++" }])
          } else {
            // add the PPA for access to more versions
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
        }
      } else {
        info(`Install g++-multilib because gcc for ${arch} was requested`)
        if (isArch()) {
          installationInfo = await setupPacmanPack("gcc-multilib", version)
        } else if (isUbuntu()) {
          if (version === "") {
            // the default version
            installationInfo = await installAptPack([{ name: "gcc-multilib" }])
          } else {
            // add the PPA for access to more versions
            installationInfo = await installAptPack([{
              name: "gcc-multilib",
              version,
              repository: "ppa:ubuntu-toolchain-r/test",
              key: { key: "1E9377A2BA9EF27F", fileName: "ubuntu-toolchain-r-test.gpg" },
            }])
          }
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

async function activateGcc(givenVersion: string, binDir: string, priority: number = 40) {
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
    // if version is empty, get the version from the gcc command
    let version = givenVersion
    if (givenVersion === "") {
      version = await getGccCmdVersion(binDir, version)
      info(`Using gcc version ${version}`)
    }

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

async function getGccCmdVersion(binDir: string, givenVersion: string) {
  // TODO get the version from the package manager
  try {
    let gccExe = "gcc"
    if (await pathExists(`${binDir}/gcc`)) {
      gccExe = `${binDir}/gcc`
    } else {
      // try to find the gcc exe in the bin dir
      const files = await readdir(binDir)
      for (const file of files) {
        if (file.startsWith("gcc")) {
          gccExe = `${binDir}/${file}`
          break
        }
      }
    }

    const { stdout: versionStdout } = await execa(gccExe, ["--version"], { stdio: "pipe" })

    const versionMatch = (versionStdout as string).match(/gcc \(.*\) ([\d.]+)/)

    if (versionMatch !== null) {
      return versionMatch[1]
    }

    warning(`Failed to parse gcc version from: ${versionStdout}`)
    return givenVersion
  } catch (err) {
    error(`Failed to get gcc version: ${err}`)
    return givenVersion
  }
}

async function addGccLoggingMatcher() {
  const matcherPath = join(__dirname, "gcc_matcher.json")
  if (!(await pathExists(matcherPath))) {
    return warning("the gcc_matcher.json file does not exist in the same folder as setup-cpp.js")
  }
  info(`::add-matcher::${matcherPath}`)
}
