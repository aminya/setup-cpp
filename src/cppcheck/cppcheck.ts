import { addPath } from "envosman"
import { hasApk, installApkPack } from "setup-alpine"
import { hasAptGet, installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { rcOptions } from "../options.js"
import type { SetupOptions } from "../setup-options.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

export async function setupCppcheck({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("cppcheck", version)
      const binDir = await activateWinCppcheck()
      return { binDir }
    }
    case "darwin": {
      return installBrewPack("cppcheck", version)
    }
    case "linux": {
      if (isArch()) {
        return setupPacmanPack("cppcheck", version)
      } else if (hasDnf()) {
        return setupDnfPack([{ name: "ccache", version }])
      } else if (hasAptGet()) {
        return installAptPack([{ name: "cppcheck", version }])
      } else if (await hasApk()) {
        return installApkPack([{ name: "cppcheck", version }])
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
