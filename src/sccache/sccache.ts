import { hasApk, installApkPack } from "setup-alpine"
import { hasAptGet, installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { getUbuntuVersion } from "ubuntu-version"
import type { SetupOptions } from "../setup-options.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"

export async function setupSccache({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("sccache", version)
    }
    case "linux": {
      if (hasAptGet()) {
        const ubuntuVersion = await getUbuntuVersion()
        if (ubuntuVersion[0] >= 24) {
          return installAptPack([{ name: "sccache", version }])
        }
      } else if (await hasApk()) {
        return installApkPack([{ name: "sccache", version }])
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
