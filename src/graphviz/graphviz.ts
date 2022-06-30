import { addPath } from "../utils/env/addEnv"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"
import { InstallationInfo } from "../utils/setup/setupBin"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { isArch } from "../utils/env/isArch"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupGraphviz(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("graphviz", version)
      return activateGraphviz()
    }
    case "darwin": {
      return setupBrewPack("graphviz", version)
    }
    case "linux": {
      if (isArch()) {
        return setupPacmanPack("graphviz", version)
      }
      return setupAptPack("graphviz", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}

async function activateGraphviz(): Promise<InstallationInfo> {
  switch (process.platform) {
    case "win32": {
      const binDir = "C:/Program Files/Graphviz/bin"
      await addPath(binDir)
      return { binDir }
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
