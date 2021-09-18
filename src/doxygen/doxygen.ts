import { addPath } from "../utils/path/addPath"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupDoxygen(version: string | undefined, _setupCppDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("doxygen.install", version)
      await setupChocoPack("graphviz", version)
      await addPath("C:/Program Files/Graphviz/bin")
      const binDir = "C:/Program Files/doxygen/bin"
      await addPath(binDir)
      return { binDir }
    }
    case "darwin": {
      setupBrewPack("doxygen", version)
      return setupBrewPack("graphviz", version)
    }
    case "linux": {
      await setupAptPack("doxygen", version)
      return setupAptPack("graphviz", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
