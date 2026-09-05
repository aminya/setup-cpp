import { join } from "path"
import { addPath } from "envosman"
import { hasApk, installApkPack } from "setup-alpine"
import { hasAptGet, installAptPack } from "setup-apt"
import { getBrewDir, installBrewPack } from "setup-brew"
import { hasDnf, setupDnfPack } from "setup-dnf"
import { isArch, setupPacmanPack } from "setup-pacman"
import { rcOptions } from "../options.js"
import type { SetupOptions } from "../setup-options.js"

const packages = ["autoconf", "autoconf-archive", "automake", "libtool"] as const

export async function setupAutoreconf({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
  switch (process.platform) {
    case "darwin": {
      for (const name of packages) {
        // These installs are intentionally sequential so Homebrew can update its linked tool paths.
        // eslint-disable-next-line no-await-in-loop
        await installBrewPack(name, version)
      }

      const gnuBinDir = join(getBrewDir(), "opt/libtool/libexec/gnubin")
      await addPath(gnuBinDir, rcOptions)
      return { binDir: gnuBinDir }
    }
    case "linux":
      if (isArch()) {
        for (const name of packages) {
          // pacman package setup is sequential because the shared helper initializes the repository once.
          // eslint-disable-next-line no-await-in-loop
          await setupPacmanPack(name, version)
        }
        return { binDir: "/usr/bin/" }
      }
      if (hasDnf()) {
        return setupDnfPack(packages.map((name) => ({ name, version })))
      }
      if (hasAptGet()) {
        return installAptPack(packages.map((name) => ({ name, version })))
      }
      if (await hasApk()) {
        return installApkPack(packages.map((name) => ({ name, version })))
      }
      throw new Error("Unsupported linux distribution")
    default:
      throw new Error("Unsupported platform")
  }
}
