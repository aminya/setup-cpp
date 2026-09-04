import { existsSync } from "fs"
import { join } from "path"
import { info, warning } from "ci-log"
import { addPath } from "envosman"
import { hasApk, installApkPack } from "setup-alpine"
import { hasAptGet, installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { hasDnf, setupDnfPack } from "setup-dnf"
import { isArch, setupPacmanPack } from "setup-pacman"
import which from "which"
import { rcOptions } from "../options.js"
import type { SetupOptions } from "../setup-options.js"
import { setupChocoPack } from "../utils/setup-choco.js"

export async function setupGit({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
  const git = await which("git", { nothrow: true })
  if (git !== null) {
    info(`Git already installed at ${git}`)
    return
  }

  switch (process.platform) {
    case "win32": {
      const result = await setupChocoPack("git", version)
      const gitDir = findWindowsGit()
      if (gitDir !== null) {
        await addPath(gitDir, rcOptions)
      }
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
      } else if (hasAptGet()) {
        return installAptPack([{ name: "git", version }])
      } else if (await hasApk()) {
        return installApkPack([{ name: "git", version }])
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}

function findWindowsGit() {
  const candidates = [
    "C:/Program Files/Git/bin/",
    "C:/Program Files (x86)/Git/bin/",
  ]
  for (const candidate of candidates) {
    if (existsSync(join(candidate, "git.exe"))) {
      return candidate
    }
  }

  warning("Git not found in the default locations. Add git to PATH manually.")
  return null
}
