import { info } from "ci-log"
import { hasApk, installApkPack } from "setup-alpine"
import { hasAptGet, installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import which from "which"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { setupBin } from "../utils/setup/setupBin.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupTar(version: string, setupDir: string, arch: string) {
  const tar = await which("tar", { nothrow: true })
  if (tar !== null) {
    info(`tar already installed at ${tar}`)
    return
  }

  switch (process.platform) {
    case "win32": {
      // install tar from GnuWin
      // https://phoenixnap.dl.sourceforge.net/project/gnuwin32/tar/1.13-1/tar-1.13-1-bin.zip?viasf=1
      return setupBin(
        "tar",
        "1.13-1",
        () => {
          return {
            url: "https://phoenixnap.dl.sourceforge.net/project/gnuwin32/tar/1.13-1/tar-1.13-1-bin.zip?viasf=1",
            extractedFolderName: "",
            binRelativeDir: "bin",
            binFileName: "tar.exe",
          }
        },
        setupDir,
        arch,
      )
    }
    case "darwin": {
      // installs as gtar
      return installBrewPack("gnu-tar", version)
    }
    case "linux": {
      if (isArch()) {
        await setupPacmanPack("gzip")
        await setupPacmanPack("xz")
        return setupPacmanPack("tar")
      } else if (hasDnf()) {
        return setupDnfPack([{ name: "tar" }, { name: "gzip" }, { name: "xz" }])
      } else if (hasAptGet()) {
        return installAptPack([{ name: "tar" }, { name: "gzip" }, { name: "xz-utils" }])
      } else if (await hasApk()) {
        return installApkPack([{ name: "tar" }, { name: "gzip" }, { name: "xz" }])
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
