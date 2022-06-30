import { addPath } from "../utils/env/addEnv"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { isArch } from "../utils/env/isArch"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupMake(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("make", version)
    }
    case "darwin": {
      setupBrewPack("make", version)
      await addPath("/usr/local/opt/make/libexec/gnubin")
      return { binDir: "/usr/local/opt/make/libexec/gnubin" }
    }
    case "linux": {
      if (isArch()) {
        return setupPacmanPack("make", version)
      }
      return setupAptPack("make", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
