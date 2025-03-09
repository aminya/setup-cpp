import { addPath } from "envosman"
import { installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { rcOptions } from "../cli-options.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupGit(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      const result = await setupChocoPack("git", version)
      result.binDir = "C:/Program Files (x86)/Git/bin"
      await addPath(result.binDir, rcOptions)
      return result
    }
    case "darwin": {
      return installBrewPack("git", version)
    }
    case "linux": {
      if (isArch()) {
        return setupPacmanPack("git", version)
      } else if (hasDnf()) {
        return setupDnfPack([{ name: "git", version }])
      } else if (isUbuntu()) {
        return installAptPack([{ name: "git", version }])
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
