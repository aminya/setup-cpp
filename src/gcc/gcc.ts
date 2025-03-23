import path from "path"
import { fileURLToPath } from "url"
import ciInfo from "ci-info"
const { GITHUB_ACTIONS } = ciInfo
import { error, warning } from "ci-log"
import { addEnv } from "envosman"
import escapeRegex from "escape-string-regexp"
import { execa } from "execa"
import { readdir } from "fs/promises"
import { pathExists } from "path-exists"
import { addExeExt } from "patha"
import semverMajor from "semver/functions/major"
import { hasApk, installApkPack } from "setup-alpine"
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
import { compareVersion, semverCoerceIfInvalid } from "../utils/setup/version.js"
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
      if (isArch()) {
        installationInfo = await setupPacmanPack("gcc", version)
      } else if (hasDnf()) {
        installationInfo = await setupDnfPack([
          { name: "gcc", version },
          { name: "gcc-c++", version },
          { name: "libstdc++-devel" },
        ])
      } else if (await hasApk()) {
        installationInfo = await installApkPack([{ name: "gcc", version }, { name: "g++", version }])
      } else if (isUbuntu()) {
        if (version === "") {
          // the default version
          installationInfo = await installAptPack([{ name: "gcc" }, { name: "g++" }])
        } else {
          try {
            // first try to install the version from the default repository
            installationInfo = await installAptPack([
              {
                name: "gcc",
                version,
              },
              {
                name: "g++",
                version,
              },
            ])
          } catch (err) {
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
      }
      // if (arch !== "x64") {
      //   try {
      //     info(`Install g++-multilib because gcc for ${arch} was requested`)
      //     if (isArch()) {
      //       installationInfo = await setupPacmanPack("gcc-multilib", version)
      //     } else if (isUbuntu()) {
      //       if (version === "") {
      //         // the default version
      //         installationInfo = await installAptPack([{ name: "gcc-multilib" }])
      //       } else {
      //         // add the PPA for access to more versions
      //         installationInfo = await installAptPack([{
      //           name: "gcc-multilib",
      //           version,
      //           repository: "ppa:ubuntu-toolchain-r/test",
      //           key: { key: "1E9377A2BA9EF27F", fileName: "ubuntu-toolchain-r-test.gpg" },
      //         }])
      //       }
      //     }
      //   } catch (err) {
      //     info(`Failed to install gcc-multilib ${err}\nSkipping the dependency`)
      //   }
      // }
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
    const binVersion = getGccBinVersion(givenVersion)

    const [gccPath, gxxPath] = await Promise.all([
      findGccExe("gcc", binDir, binVersion),
      findGccExe("g++", binDir, binVersion),
    ])

    promises.push(
      addEnv("CC", gccPath, rcOptions),
      addEnv("CXX", gxxPath, rcOptions),
    )

    if (isUbuntu()) {
      promises.push(
        addUpdateAlternativesToRc("cc", gccPath, rcOptions, priority),
        addUpdateAlternativesToRc("cxx", gxxPath, rcOptions, priority),
        addUpdateAlternativesToRc("gcc", gccPath, rcOptions, priority),
        addUpdateAlternativesToRc("g++", gxxPath, rcOptions, priority),
      )
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

/**
 * Get the version string used in the gcc exe name
 */
function getGccBinVersion(givenVersion: string) {
  try {
    const coerced = semverCoerceIfInvalid(givenVersion)
    const majorVersion = semverMajor(coerced)
    return majorVersion >= 5 ? `${majorVersion}` : givenVersion
  } catch {
    // ignore
    return givenVersion
  }
}

async function findGccExe(variant: "gcc" | "g++", binDir: string, binVersion: string) {
  if (await pathExists(`${binDir}/${variant}-${binVersion}`)) {
    return addExeExt(`${binDir}/${variant}-${binVersion}`)
  }

  // try to find the gcc exe in the bin dir
  const gccExeRegex = new RegExp(`^${escapeRegex(variant)}-?([\\d\\.\\-]*)(?:\\.exe)?$`)
  const files = (await readdir(binDir))
    .filter((file) => gccExeRegex.test(file))
    .sort(
      (exe1, exe2) => {
        const version1 = exe1.match(gccExeRegex)?.[1] ?? ""
        const version2 = exe2.match(gccExeRegex)?.[1] ?? ""
        try {
          return compareVersion(version1, version2)
        } catch {
          return 0
        }
      },
    )

  for (const file of files) {
    const gccExe = `${binDir}/${file}`
    if (
      binVersion === ""
      || file.includes(binVersion)
      /* eslint-disable-next-line no-await-in-loop */
      || ((await getGccCmdVersion(gccExe))?.includes(binVersion) ?? false)
    ) {
      return addExeExt(gccExe)
    }
  }

  if (await pathExists(`${binDir}/${variant}`)) {
    return addExeExt(`${binDir}/${variant}`)
  }

  return addExeExt(variant)
}

async function getGccCmdVersion(gccExe: string) {
  // TODO get the version from the package manager
  try {
    const { stdout: versionStdout } = await execa(gccExe, ["--version"], { stdio: "pipe" })

    // gcc-11 (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0
    // gcc (Ubuntu 13.1.0-8ubuntu1~22.04) 13.1.0
    // gcc-14 (Homebrew GCC 14.2.0_1) 14.2.0
    // g++-14 (Homebrew GCC 14.2.0_1) 14.2.0

    const versionMatch = versionStdout.match(/(gcc|g\+\+).* \(.*\) ([\d.]+)/)

    if (versionMatch !== null) {
      return versionMatch[2]
    }

    warning(`Failed to parse gcc version from: ${versionStdout}`)
  } catch (err) {
    error(`Failed to get gcc version: ${err}`)
  }
  return undefined
}
