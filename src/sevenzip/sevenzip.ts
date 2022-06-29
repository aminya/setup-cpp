import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import which from "which"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupSevenZip(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("7zip", version)
    }
    case "darwin": {
      return setupBrewPack("p7zip", version)
    }
    case "linux": {
      if (which.sync("pacman", { nothrow: true })) {
        return setupPacmanPack("p7zip", version)
      }
      return setupAptPack("p7zip-full", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
