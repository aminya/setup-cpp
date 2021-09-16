import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

export function setupCppcheck(version?: string) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("cppcheck", version)
    }
    case "darwin": {
      return setupBrewPack("cppcheck", version)
    }
    case "linux": {
      return setupAptPack("cppcheck", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
