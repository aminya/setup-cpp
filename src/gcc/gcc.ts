import path from "path"
import { fileURLToPath } from "url"
import ciInfo from "ci-info"
const { GITHUB_ACTIONS } = ciInfo
import { error, info, warning } from "ci-log"
import { addEnv } from "envosman"
import { execa } from "execa"
import { readdir } from "fs/promises"
import { pathExists } from "path-exists"
import semverCoerce from "semver/functions/coerce"
import semverMajor from "semver/functions/major"
import { addUpdateAlternativesToRc, installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { rcOptions } from "../cli-options.js"
import { setupMacOSSDK } from "../macos-sdk/macos-sdk.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import type { InstallationInfo } from "../utils/setup/setupBin.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"
import { compareVersion } from "../utils/setup/version.js"
import { addGccLoggingMatcher } from "./gccMatcher.js"
import { setupMingw } from "./mingw.js"

export const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export async function setupGcc(version: string, setupDir: string, arch: string, priority: number = 40) {
  let installationInfo: InstallationInfo | undefined
  switch (process.platform) {
    case "win32": {
      installationInfo = await setupMingw(version, setupDir, arch)
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

/**
 * Setup gcc as the compiler on Linux and macOS
 */
async function activateGcc(givenVersion: string, binDir: string, priority: number = 40) {
  if (process.platform === "win32") {
    // already done in setupMingw
    return
  }

  const promises: Promise<void>[] = []

  {
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
      const files = (await readdir(binDir)).sort(
        (exe1, exe2) => {
          const version1 = exe1.match(/^gcc-?(.*)(\.exe)?$/)?.[1] ?? ""
          const version2 = exe2.match(/^gcc-?(.*)(\.exe)?$/)?.[1] ?? ""
          return compareVersion(version1, version2)
        },
      )
      for (const file of files) {
        if (file.startsWith("gcc")) {
          gccExe = `${binDir}/${file}`
          break
        }
      }
    }

    const { stdout: versionStdout } = await execa(gccExe, ["--version"], { stdio: "pipe" })

    // gcc-11 (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0
    // gcc-12 (Homebrew GCC 12.4.0) 12.4.0
    // gcc (Ubuntu 13.1.0-8ubuntu1~22.04) 13.1.0

    const versionMatch = (versionStdout as string).match(/gcc.* \(.*\) ([\d.]+)/)

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
