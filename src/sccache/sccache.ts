import { hasApk, installApkPackage } from "setup-alpine"
import { installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { getUbuntuVersion } from "ubuntu-version"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupSccache(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("sccache", version)
    }
    case "linux": {
      if (isUbuntu()) {
        const ubuntuVersion = await getUbuntuVersion()
        if (ubuntuVersion[0] >= 24) {
          return installAptPack([{ name: "sccache", version }])
        }
      } else if (await hasApk()) {
        return installApkPackage([{ name: "sccache", version }])
      }

      return installBrewPack("sccache", version)
    }
    case "darwin": {
      return installBrewPack("sccache", version)
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
