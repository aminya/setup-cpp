import { hasApk, installApkPack } from "setup-alpine"
import { installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { hasAptGet } from "../utils/env/hasAptGet.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupSevenZip(version: string, _setupDir: string, _arch: string) {
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
