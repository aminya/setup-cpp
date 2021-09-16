import { addPath } from "@actions/core"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupGcc(version: string, _setupCppDir: string, arch: string) {
  switch (process.platform) {
    case "win32": {
      if (arch === "arm" || arch === "arm64") {
        await setupChocoPack("gcc-arm-embedded", version)
      }
      await setupChocoPack("mingw", version)
      if (arch === "x64") {
        addPath("C:\\tools\\mingw64\\bin")
      } else if (arch === "ia32") {
        addPath("C:\\tools\\mingw32\\bin")
      }
      break
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
