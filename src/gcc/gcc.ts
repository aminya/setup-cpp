import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupGcc(version: string, _setupCppDir: string, arch: string) {
  switch (process.platform) {
    case "win32": {
      if (arch === "arm" || arch === "arm64") {
        return setupChocoPack("gcc-arm-embedded", version)
      }
      return setupChocoPack("mingw", version)
    }
    case "darwin": {
      return setupBrewPack("gcc", version)
    }
    case "linux": {
      if (arch === "x64") {
        return setupAptPack("g++", version, "ppa:ubuntu-toolchain-r/test")
      }
      return setupAptPack("g++-multilib", version, "ppa:ubuntu-toolchain-r/test")
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
}
