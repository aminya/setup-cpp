import { join } from "path"
import { info, notice } from "ci-log"
import { addPath } from "envosman"
import { pathExists } from "path-exists"
import { addExeExt } from "patha"
import retry from "retry-as-promised"
import { hasApk, installApkPack } from "setup-alpine"
import { installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { setupGraphviz } from "../graphviz/graphviz.js"
import { rcOptions } from "../options.js"
import { arm64 } from "../utils/env/arch.js"
import { hasAptGet } from "../utils/env/hasAptGet.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { macosVersion } from "../utils/env/macos_version.js"
import { ubuntuVersion } from "../utils/env/ubuntu_version.js"
import { type PackageInfo, setupBin } from "../utils/setup/setupBin.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDmg } from "../utils/setup/setupDmg.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"
import { getVersion } from "../versions/versions.js"

/** Get the platform data for cmake */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDoxygenPackageInfo(version: string, platform: NodeJS.Platform, _arch: string): PackageInfo {
  switch (platform) {
    case "linux": {
      if (process.arch === "arm64") {
        throw new Error("Doxygen binaries are not available for Linux arm64")
      }
      const folderName = `doxygen-${version}`
      return {
        binRelativeDir: "bin/",
        binFileName: addExeExt("doxygen"),
        extractedFolderName: folderName,
        url: `https://www.doxygen.nl/files/${folderName}.linux.bin.tar.gz`,
      }
    }
    case "win32": {
      const folderName = `doxygen-${version}`
      return {
        binRelativeDir: "",
        binFileName: addExeExt("doxygen"),
        extractedFolderName: folderName,
        url: `https://www.doxygen.nl/files/${folderName}.windows.x64.bin.zip`,
      }
    }
    case "darwin": {
      const folderName = `Doxygen-${version}`
      return {
        binRelativeDir: "Doxygen/Doxygen.app/Contents/Resources/",
        binFileName: addExeExt("doxygen"),
        extractedFolderName: folderName,
        extractFunction: setupDmg,
        url: `https://doxygen.nl/files/${folderName}.dmg`,
      }
    }
    default:
      throw new Error(`Unsupported platform '${platform}'`)
  }
}

export async function setupDoxygen(version: string, setupDir: string, arch: string) {
  switch (process.platform) {
    case "win32": {
      // try to download the package 4 times with 2 seconds delay
      await retry(
        () => {
          return setupChocoPack("doxygen.install", version)
        },
        { name: "doxygen.install", max: 4, backoffBase: 2000, report: (err) => info(err) },
      )
      const binDir = await activateWinDoxygen()
      const installationInfo = { binDir }
      await setupGraphviz(getVersion("graphviz", undefined), "", arch)
      return installationInfo
    }
    case "darwin": {
      // let installationInfo: InstallationInfo
      // try {
      //   installationInfo = await setupBin("doxygen", version, getDoxygenPackageInfo, setupDir, arch)
      // } catch {
      const installationInfo = await installBrewPack("doxygen", undefined, {
        formula: true,
      })
      // }

      // only install graphviz if the macOS version is greater than 11
      if (macosVersion()[0] > 11) {
        await setupGraphviz(getVersion("graphviz", undefined), "", arch)
      }
      return installationInfo
    }
    case "linux": {
      const installationInfo = await setupLinuxDoxygen(version, setupDir, arch)
      await setupGraphviz(getVersion("graphviz", undefined, await ubuntuVersion()), "", arch)
      return installationInfo
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
async function setupLinuxDoxygen(version: string, setupDir: string, arch: string) {
  try {
    if (isArch()) {
      return await setupPacmanPack("doxygen", version)
    } else if (hasDnf()) {
      return setupDnfPack([{ name: "doxygen", version }])
    } else if (hasAptGet()) {
      return await installAptPack([{ name: "doxygen", version, fallBackToLatest: arm64.includes(arch) }])
    } else if (await hasApk()) {
      return installApkPack([
        {
          name: "doxygen",
          // version,
        },
      ])
    } else {
      throw new Error("Unsupported linux distributions")
    }
  } catch {
    // fallback to setupBin if the installation failed
    try {
      const installationInfo = await setupBin("doxygen", version, getDoxygenPackageInfo, setupDir, arch)
      if (hasAptGet()) {
        try {
          await installAptPack([{ name: "libclang-cpp-dev" }])
        } catch (err) {
          info(`Failed to download libclang-cpp-dev that might be needed for running doxygen. ${err}`)
        }
      }
      return installationInfo
    } catch (err) {
      notice(`Failed to download doxygen binary. ${err}. Falling back to installing the latest version from apt-get.`)
      return installAptPack([{ name: "doxygen" }])
    }
  }
}

async function activateWinDoxygen() {
  switch (process.platform) {
    case "win32": {
      for (
        const binDir of [
          "C:/ProgramData/chocolatey/bin",
          "C:/Program Files/doxygen/bin",
          "C:/Program Files (x86)/doxygen",
        ]
      ) {
        // eslint-disable-next-line no-await-in-loop
        if (await pathExists(join(binDir, "doxygen.exe"))) {
          // eslint-disable-next-line no-await-in-loop
          await addPath(binDir, rcOptions)
          return binDir
        }
      }
      throw new Error("Failed to find doxygen binary")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
