import { addPath } from "os-env"
import { rcOptions } from "../cli-options.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { setupAptPack } from "../utils/setup/setupAptPack.js"
import { setupBrewPack } from "../utils/setup/setupBrewPack.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

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
      if (isArch()) {
        return setupPacmanPack("cppcheck", version)
      } else if (hasDnf()) {
        return setupDnfPack([{ name: "ccache", version }])
      } else if (isUbuntu()) {
        return setupAptPack([{ name: "cppcheck", version }])
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}

async function activateWinCppcheck() {
  const binDir = "C:/Program Files/Cppcheck"
  await addPath(binDir, rcOptions)
  return binDir
}
