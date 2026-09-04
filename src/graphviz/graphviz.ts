import { addPath } from "envosman"
import { hasApk, installApkPack } from "setup-alpine"
import { hasAptGet, installAptPack } from "setup-apt"
import type { InstallationInfo } from "setup-bin"
import { installBrewPack } from "setup-brew"
import { hasDnf, setupDnfPack } from "setup-dnf"
import { isArch, setupPacmanPack } from "setup-pacman"
import { rcOptions } from "../options.js"
import type { SetupOptions } from "../setup-options.js"
import { setupChocoPack } from "../utils/setup-choco.js"

export async function setupGraphviz({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
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
