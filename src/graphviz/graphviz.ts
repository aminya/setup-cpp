import { addPath } from "envosman"
import { hasApk, installApkPack } from "setup-alpine"
import { hasAptGet, installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { rcOptions } from "../options.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import type { InstallationInfo } from "../utils/setup/setupBin.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupGraphviz(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("graphviz", version)
      return activateGraphviz()
    }
    case "darwin": {
      return installBrewPack("graphviz", version)
    }
    case "linux": {
      if (isArch()) {
        return setupPacmanPack("graphviz", version)
      } else if (hasDnf()) {
        return setupDnfPack([{ name: "graphviz", version }])
      } else if (hasAptGet()) {
        return installAptPack([{ name: "graphviz", version }])
      } else if (await hasApk()) {
        return installApkPack([{ name: "graphviz", version }])
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}

async function activateGraphviz(): Promise<InstallationInfo> {
  switch (process.platform) {
    case "win32": {
      const binDir = "C:/Program Files/Graphviz/bin"
      await addPath(binDir, rcOptions)
      return { binDir }
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
