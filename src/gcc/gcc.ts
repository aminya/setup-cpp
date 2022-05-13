import { addPath, addEnv } from "../utils/env/addEnv"
import { existsSync } from "fs"
import { setupAptPack, updateAptAlternatives } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import semverMajor from "semver/functions/major"
import semverCoerce from "semver/functions/coerce"
import { setupMacOSSDK } from "../macos-sdk/macos-sdk"
import path from "path"
import { warning, info } from "../utils/io/io"
import { isGitHubCI } from "../utils/env/isci"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupGcc(version: string, _setupDir: string, arch: string) {
  let binDir: string | undefined
  switch (process.platform) {
    case "win32": {
      if (arch === "arm" || arch === "arm64") {
        await setupChocoPack("gcc-arm-embedded", version)
      }
      await setupChocoPack("mingw", version)
      if (arch === "x64" && existsSync("C:/tools/mingw64/bin")) {
        binDir = "C:/tools/mingw64/bin"
        await addPath(binDir)
      } else if (arch === "ia32" && existsSync("C:/tools/mingw32/bin")) {
        binDir = "C:/tools/mingw32/bin"
        await addPath(binDir)
      } else if (existsSync(`${process.env.ChocolateyInstall ?? "C:/ProgramData/chocolatey"}/bin/g++.exe`)) {
        binDir = `${process.env.ChocolateyInstall ?? "C:/ProgramData/chocolatey"}/bin`
      }
      break
    }
    case "darwin": {
      binDir = setupBrewPack("gcc", version).binDir
      break
    }
    case "linux": {
      if (arch === "x64") {
        setupAptPack("gcc", version, ["ppa:ubuntu-toolchain-r/test"])
        binDir = setupAptPack("g++", version, []).binDir
      } else {
        info(`Install g++-multilib because gcc for ${arch} was requested`)
        setupAptPack("gcc-multilib", version, ["ppa:ubuntu-toolchain-r/test"])
        binDir = setupAptPack("g++-multilib", version, []).binDir
      }
      break
    }
    // TODO support bare-metal (need to support passing it as the input)
    // TODO support abi
    // case "none": {
    //   if (arch === "arm" || arch === "arm64") {
    //     return setupAptPack("gcc-arm-none-eabi", version, [
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
  if (binDir !== undefined) {
    await activateGcc(version, binDir)
    return { binDir }
  }
  return undefined
}

async function activateGcc(version: string, binDir: string) {
  const promises: Promise<void>[] = []
  // Setup gcc as the compiler

  // TODO
  // const ld = process.env.LD_LIBRARY_PATH ?? ""
  // const dyld = process.env.DYLD_LIBRARY_PATH ?? ""
  // promises.push(
  //   addEnv("LD_LIBRARY_PATH", `${installDir}/lib${path.delimiter}${ld}`),
  //   addEnv("DYLD_LIBRARY_PATH", `${installDir}/lib${path.delimiter}${dyld}`),
  //   addEnv("CPATH", `${installDir}/lib/gcc/${majorVersion}/include`),
  //   addEnv("LDFLAGS", `-L${installDir}/lib`),
  //   addEnv("CPPFLAGS", `-I${installDir}/include`)
  // )

  if (process.platform === "win32") {
    promises.push(addEnv("CC", `${binDir}/gcc`), addEnv("CXX", `${binDir}/g++`))
  } else {
    const majorVersion = semverMajor(semverCoerce(version) ?? version)
    if (majorVersion >= 5) {
      promises.push(addEnv("CC", `${binDir}/gcc-${majorVersion}`), addEnv("CXX", `${binDir}/g++-${majorVersion}`))

      if (process.platform === "linux") {
        updateAptAlternatives("cc", `${binDir}/gcc-${majorVersion}`)
        updateAptAlternatives("cxx", `${binDir}/g++-${majorVersion}`)
        updateAptAlternatives("gcc", `${binDir}/gcc-${majorVersion}`)
        updateAptAlternatives("g++", `${binDir}/g++-${majorVersion}`)
      }
    } else {
      promises.push(addEnv("CC", `${binDir}/gcc-${version}`), addEnv("CXX", `${binDir}/g++-${version}`))

      if (process.platform === "linux") {
        updateAptAlternatives("cc", `${binDir}/gcc-${version}`)
        updateAptAlternatives("cxx", `${binDir}/g++-${version}`)
        updateAptAlternatives("gcc", `${binDir}/gcc-${version}`)
        updateAptAlternatives("g++", `${binDir}/g++-${version}`)
      }
    }
  }

  promises.push(setupMacOSSDK())

  if (isGitHubCI()) {
    addGccLoggingMatcher()
  }

  await Promise.all(promises)
}

function addGccLoggingMatcher() {
  const matcherPath = path.join(__dirname, "gcc_matcher.json")
  if (!existsSync(matcherPath)) {
    return warning("the gcc_matcher.json file does not exist in the same folder as setup_cpp.js")
  }
  info(`::add-matcher::${matcherPath}`)
}
