import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

export async function setupDoxygen(version?: string) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("graphviz", version)
      return setupChocoPack("doxygen.install", version)
    }
    case "darwin": {
      await setupBrewPack("graphviz", version)
      return setupBrewPack("doxygen", version)
    }
    case "linux": {
      await setupAptPack("graphviz", version)
      return setupAptPack("doxygen", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
