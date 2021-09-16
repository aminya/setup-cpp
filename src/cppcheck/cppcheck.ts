import { addPath } from "@actions/core"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupCppcheck(version: string | undefined, _setupCppDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("cppcheck", version)
      addPath("C:\\Program Files\\Cppcheck")
      break
    }
    case "darwin": {
      return setupBrewPack("cppcheck", version)
    }
    case "linux": {
      return setupAptPack("cppcheck", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
