import { addPath } from "os-env"
import { rcOptions } from "../cli-options"
import { hasDnf } from "../utils/env/hasDnf"
import { isArch } from "../utils/env/isArch"
import { isUbuntu } from "../utils/env/isUbuntu"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { setupDnfPack } from "../utils/setup/setupDnfPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupMake(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("make", version)
    }
    case "darwin": {
      await setupBrewPack("make", version)
      await addPath("/usr/local/opt/make/libexec/gnubin", rcOptions)
      return { binDir: "/usr/local/opt/make/libexec/gnubin" }
    }
    case "linux": {
      if (isArch()) {
        return setupPacmanPack("make", version)
      } else if (hasDnf()) {
        return setupDnfPack([{ name: "make", version }])
      } else if (isUbuntu()) {
        return setupAptPack([{ name: "make", version }])
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
