import { addPath } from "../utils/env/addEnv"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

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
      return setupAptPack("make", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
