import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

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
      return setupAptPack("p7zip-full", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
