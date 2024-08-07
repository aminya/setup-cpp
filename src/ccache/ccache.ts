import { hasDnf } from "../utils/env/hasDnf"
import { isArch } from "../utils/env/isArch"
import { isUbuntu } from "../utils/env/isUbuntu"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { setupDnfPack } from "../utils/setup/setupDnfPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"

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
      if (isArch()) {
        return setupPacmanPack("ccache", version)
      } else if (hasDnf()) {
        return setupDnfPack([{ name: "ccache", version }])
      } else if (isUbuntu()) {
        return setupAptPack([{ name: "ccache", version }])
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
