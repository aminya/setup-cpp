import { join } from "path"
import { addPath } from "envosman"
import { hasApk, installApkPack } from "setup-alpine"
import { hasAptGet, installAptPack } from "setup-apt"
import { getBrewDir, installBrewPack } from "setup-brew"
import { hasDnf, setupDnfPack } from "setup-dnf"
import { isArch, setupPacmanPack } from "setup-pacman"
import { rcOptions } from "../options.js"
import type { SetupOptions } from "../setup-options.js"
import { setupChocoPack } from "../utils/setup-choco.js"

export async function setupMake({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("make", version)
    }
    case "darwin": {
      await installBrewPack("make", version)

      const gnuBinDir = join(getBrewDir(), "opt/make/libexec/gnubin")
      await addPath(gnuBinDir, rcOptions)
      return { binDir: gnuBinDir }
    }
    case "linux": {
      if (isArch()) {
        return setupPacmanPack("make", version)
      } else if (hasDnf()) {
        return setupDnfPack([{ name: "make", version }])
      } else if (hasAptGet()) {
        return installAptPack([{ name: "make", version }])
      } else if (await hasApk()) {
        return installApkPack([{ name: "make", version }])
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
