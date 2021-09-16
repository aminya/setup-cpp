import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

export function setupCcache(version?: string) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("ccache", version)
    }
    case "darwin": {
      return setupBrewPack("ccache", version)
    }
    case "linux": {
      return setupAptPack("ccache", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
