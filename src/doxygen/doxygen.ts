import { addPath } from "@actions/core"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupDoxygen(version: string | undefined, _setupCppDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("graphviz", version)
      await setupChocoPack("doxygen.install", version)
      addPath("C:\\Program Files\\Graphviz\\bin")
      const binDir = "C:\\Program Files\\doxygen\\bin"
      addPath(binDir)
      return { binDir }
    }
    case "darwin": {
      setupBrewPack("graphviz", version)
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
