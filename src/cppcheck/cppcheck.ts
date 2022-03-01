import { addPath } from "../utils/env/addEnv"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupCppcheck(version: string | undefined, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("cppcheck", version)
      const binDir = activateWinCppcheck()
      return { binDir }
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

function activateWinCppcheck() {
  const binDir = "C:/Program Files/Cppcheck"
  addPath(binDir)
  return binDir
}
