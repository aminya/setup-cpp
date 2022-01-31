import { info } from "@actions/core"
import { addPath } from "../utils/path/addPath"
import { existsSync } from "fs"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import semverMajor from "semver/functions/major"
import semverCoerce from "semver/functions/coerce"
import { setupMacOSSDK } from "../macos-sdk/macos-sdk"
import { addEnv } from "../utils/env/addEnv"

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
        addPath(binDir)
      } else if (arch === "ia32" && existsSync("C:/tools/mingw32/bin")) {
        binDir = "C:/tools/mingw32/bin"
        addPath(binDir)
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
        await setupAptPack("gcc", version, [
          "deb http://dk.archive.ubuntu.com/ubuntu/ xenial main",
          "deb http://dk.archive.ubuntu.com/ubuntu/ xenial universe",
          "ppa:ubuntu-toolchain-r/test",
        ])
        binDir = (
          await setupAptPack("g++", version, [
            "deb http://dk.archive.ubuntu.com/ubuntu/ xenial main",
            "deb http://dk.archive.ubuntu.com/ubuntu/ xenial universe",
            "ppa:ubuntu-toolchain-r/test",
          ])
        ).binDir
      } else {
        info(`Install g++-multilib because gcc for ${arch} was requested`)
        await setupAptPack("gcc-multilib", version, [
          "deb http://dk.archive.ubuntu.com/ubuntu/ xenial main",
          "deb http://dk.archive.ubuntu.com/ubuntu/ xenial universe",
          "ppa:ubuntu-toolchain-r/test",
        ])
        binDir = (
          await setupAptPack("g++-multilib", version, [
            "deb http://dk.archive.ubuntu.com/ubuntu/ xenial main",
            "deb http://dk.archive.ubuntu.com/ubuntu/ xenial universe",
            "ppa:ubuntu-toolchain-r/test",
          ])
        ).binDir
      }
      break
    }
    // TODO support bare-metal (need to support passing it as the input)
    // TODO support abi
    // case "none": {
    //   if (arch === "arm" || arch === "arm64") {
    //     return setupAptPack("gcc-arm-none-eabi", version, [
    //       "deb http://dk.archive.ubuntu.com/ubuntu/ xenial main",
    //       "deb http://dk.archive.ubuntu.com/ubuntu/ xenial universe",
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
  // TODO
  // const ld = process.env.LD_LIBRARY_PATH ?? ""
  // const dyld = process.env.DYLD_LIBRARY_PATH ?? ""
  // // Setup gcc as the compiler
  // addEnv("LD_LIBRARY_PATH", `${installDir}/lib${path.delimiter}${ld}`)
  // addEnv("DYLD_LIBRARY_PATH", `${installDir}/lib${path.delimiter}${dyld}`)
  // addEnv("CPATH", `${installDir}/lib/gcc/${majorVersion}/include`)
  // addEnv("LDFLAGS", `-L${installDir}/lib`)
  // addEnv("CPPFLAGS", `-I${installDir}/include`)
  if (process.platform === "win32") {
    addEnv("CC", `${binDir}/gcc`)
    addEnv("CXX", `${binDir}/g++`)
  } else {
    const majorVersion = semverMajor(semverCoerce(version) ?? version)
    if (majorVersion >= 5) {
      addEnv("CC", `${binDir}/gcc-${majorVersion}`)
      addEnv("CXX", `${binDir}/g++-${majorVersion}`)
    } else {
      addEnv("CC", `${binDir}/gcc-${version}`)
      addEnv("CXX", `${binDir}/g++-${version}`)
    }
  }

  await setupMacOSSDK()
}
