import { hasApk, installApkPack } from "setup-alpine"
import { hasAptGet, installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { hasDnf, setupDnfPack } from "setup-dnf"
import { isArch, setupPacmanPack } from "setup-pacman"
import type { SetupOptions } from "../setup-options.js"
import { setupChocoPack } from "../utils/setup-choco.js"

export async function setupSevenZip({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("7zip", version)
    }
    case "darwin": {
      return installBrewPack("p7zip", version)
    }
    case "linux": {
      if (isArch()) {
        return setupPacmanPack("p7zip", version)
      } else if (hasDnf()) {
        return setupDnfPack([
          { name: "p7zip", version },
          { name: "p7zip-plugins", version },
        ])
      } else if (hasAptGet()) {
        return installAptPack([{ name: "p7zip-full", version }])
      } else if (await hasApk()) {
        return installApkPack([{ name: "p7zip", version }])
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
