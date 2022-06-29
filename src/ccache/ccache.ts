import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import which from "which"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupCcache(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("ccache", version)
    }
    case "darwin": {
      return setupBrewPack("ccache", version)
    }
    case "linux": {
      if (which.sync("pacman", { nothrow: true })) {
        return setupPacmanPack("ccache", version)
      }
      return setupAptPack("ccache", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
