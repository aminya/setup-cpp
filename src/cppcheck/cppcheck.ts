import { addPath } from "../utils/env/addEnv"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import which from "which"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupCppcheck(version: string | undefined, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("cppcheck", version)
      const binDir = await activateWinCppcheck()
      return { binDir }
    }
    case "darwin": {
      return setupBrewPack("cppcheck", version)
    }
    case "linux": {
      if (which.sync("pacman", { nothrow: true })) {
        return setupPacmanPack("cppcheck", version)
      }
      return setupAptPack("cppcheck", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}

async function activateWinCppcheck() {
  const binDir = "C:/Program Files/Cppcheck"
  await addPath(binDir)
  return binDir
}
