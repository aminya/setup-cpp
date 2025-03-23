import { hasApk, installApkPack } from "setup-alpine"
import { installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupCcache(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("ccache", version)
    }
    case "darwin": {
      return installBrewPack("ccache", version)
    }
    case "linux": {
      if (isArch()) {
        return setupPacmanPack("ccache", version)
      } else if (hasDnf()) {
        return setupDnfPack([{ name: "ccache", version }])
      } else if (isUbuntu()) {
        return installAptPack([{ name: "ccache", version }])
      } else if (await hasApk()) {
        return installApkPack([{ name: "ccache", version }])
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
