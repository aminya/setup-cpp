import { addPath } from "../utils/env/addEnv"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { InstallationInfo } from "../utils/setup/setupBin"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupGraphviz(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      setupChocoPack("graphviz", version)
      return activateGraphviz()
    }
    case "darwin": {
      return setupBrewPack("graphviz", version)
    }
    case "linux": {
      return setupAptPack("graphviz", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}

function activateGraphviz(): InstallationInfo {
  switch (process.platform) {
    case "win32": {
      const binDir = "C:/Program Files/Graphviz/bin"
      addPath(binDir)
      return { binDir }
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
