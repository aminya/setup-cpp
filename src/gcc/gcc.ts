import { addPath, exportVariable, info } from "@actions/core"
import { existsSync } from "fs"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import semverMajor from "semver/functions/major"
import semverCoerce from "semver/functions/coerce"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupGcc(version: string, _setupCppDir: string, arch: string) {
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
      } else if (existsSync("C:/ProgramData/Chocolatey/bin/g++.exe")) {
        binDir = "C:/ProgramData/Chocolatey/bin/g++.exe"
      }
      break
    }
    case "darwin": {
      binDir = setupBrewPack("gcc", version).binDir
      break
    }
    case "linux": {
      if (arch === "x64") {
        binDir = (await setupAptPack("g++", version, "ppa:ubuntu-toolchain-r/test")).binDir
      } else {
        info(`Install g++-multilib because gcc for ${arch} was requested`)
        binDir = (await setupAptPack("g++-multilib", version, "ppa:ubuntu-toolchain-r/test")).binDir
      }
      break
    }
    // TODO support bare-metal
    // TODO support abi
    // case "none": {
    //   if (arch === "arm" || arch === "arm64") {
    //     return setupAptPack("gcc-arm-none-eabi", version, "ppa:ubuntu-toolchain-r/test")
    //   } else {
    //     throw new Error(`Unsupported platform for ${arch}`)
    //   }
    // }
    default: {
      throw new Error(`Unsupported platform for ${arch}`)
    }
  }
  if (binDir !== undefined) {
    const majorVersion = semverMajor(semverCoerce(version) ?? version)

    // TODO
    // const ld = process.env.LD_LIBRARY_PATH ?? ""
    // const dyld = process.env.DYLD_LIBRARY_PATH ?? ""

    // // Setup gcc as the compiler
    // exportVariable("LD_LIBRARY_PATH", `${installDir}/lib${path.delimiter}${ld}`)
    // exportVariable("DYLD_LIBRARY_PATH", `${installDir}/lib${path.delimiter}${dyld}`)

    // exportVariable("CPATH", `${installDir}/lib/gcc/${majorVersion}/include`)

    // exportVariable("LDFLAGS", `-L${installDir}/lib`)
    // exportVariable("CPPFLAGS", `-I${installDir}/include`)

    if (process.platform === "win32") {
      exportVariable("CC", `${binDir}/gcc`)
      exportVariable("CXX", `${binDir}/g++`)
    } else {
      exportVariable("CC", `${binDir}/gcc-${majorVersion}`)
      exportVariable("CXX", `${binDir}/g++-${majorVersion}`)
    }
    return { binDir }
  }
  return undefined
}
