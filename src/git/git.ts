import { existsSync } from "fs"
import { info, warning } from "ci-log"
import { addPath } from "envosman"
import { hasApk, installApkPackage } from "setup-alpine"
import { installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import which from "which"
import { rcOptions } from "../cli-options.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupGit(version: string, _setupDir: string, _arch: string) {
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
      } else if (isUbuntu()) {
        return installAptPack([{ name: "git", version }])
      } else if (await hasApk()) {
        return installApkPackage([{ name: "git", version }])
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
    "C:/Program Files/Git/bin/git.exe",
    "C:/Program Files (x86)/Git/bin/git.exe",
  ]
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate
    }
  }

  warning("Git not found in the default locations. Add git to PATH manually.")
  return null
}
