import { info, warning } from "ci-log"
import { hasApk, installApkPack } from "setup-alpine"
import { type SetupOptions, hasAptGet, installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import which from "which"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { type PackageInfo, setupBin } from "../utils/setup/setupBin.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupTar({ version, arch, setupDir }: SetupOptions) {
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
        version,
        getGnuWinTarPackageInfo,
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

function getGnuWinTarPackageInfo(version: string, platform: NodeJS.Platform, arch: string): PackageInfo {
  if (platform !== "win32") {
    throw new Error("Unsupported platform")
  }
  if (arch !== "x64") {
    warning(`Unsupported architecture ${arch} for tar on Windows. Using x64.`)
  }
  return {
    url: `https://phoenixnap.dl.sourceforge.net/project/gnuwin32/tar/${version}/tar-${version}-bin.zip?viasf=1`,
    extractedFolderName: "",
    binRelativeDir: "bin",
    binFileName: "tar.exe",
  }
}
