import { addPath } from "../utils/env/addEnv"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"
import { InstallationInfo, PackageInfo, setupBin } from "../utils/setup/setupBin"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { addExeExt, join } from "patha"
import { extractTar, extractZip } from "../utils/setup/extract"
import { notice } from "ci-log"
import { setupGraphviz } from "../graphviz/graphviz"
import { getVersion } from "../versions/versions"

import { isArch } from "../utils/env/isArch"
import { hasDnf } from "../utils/env/hasDnf"
import { setupDnfPack } from "../utils/setup/setupDnfPack"
import { isUbuntu } from "../utils/env/isUbuntu"
import pathExists from "path-exists"

/** Get the platform data for cmake */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDoxygenPackageInfo(version: string, platform: NodeJS.Platform, _arch: string): PackageInfo {
  switch (platform) {
    case "linux": {
      const folderName = `doxygen-${version}`
      return {
        binRelativeDir: "bin/",
        binFileName: addExeExt("doxygen"),
        extractedFolderName: folderName,
        extractFunction: extractTar,
        url: `https://www.doxygen.nl/files/${folderName}.linux.bin.tar.gz`,
      }
    }
    case "win32": {
      const folderName = `doxygen-${version}`
      return {
        binRelativeDir: "",
        binFileName: addExeExt("doxygen"),
        extractedFolderName: folderName,
        extractFunction: extractZip,
        url: `https://www.doxygen.nl/files/${folderName}.windows.x64.bin.zip`,
      }
    }
    default:
      throw new Error(`Unsupported platform '${platform}'`)
  }
}

export async function setupDoxygen(version: string, setupDir: string, arch: string) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("doxygen.install", version)
      const binDir = await activateWinDoxygen()
      const installationInfo = { binDir }
      await setupGraphviz(getVersion("graphviz", undefined), "", arch)
      return installationInfo
    }
    case "darwin": {
      const installationInfo = await setupBrewPack("doxygen", undefined)
      await setupGraphviz(getVersion("graphviz", undefined), "", arch)
      return installationInfo
    }
    case "linux": {
      let installationInfo: InstallationInfo
      if (version === "" || isArch() || hasDnf()) {
        if (isArch()) {
          installationInfo = setupPacmanPack("doxygen", version)
        } else if (hasDnf()) {
          return setupDnfPack("doxygen", version)
        } else if (isUbuntu()) {
          installationInfo = await setupAptPack([{ name: "doxygen", version }])
        } else {
          throw new Error(`Unsupported linux distributions`)
        }
      } else if (isUbuntu()) {
        try {
          // doxygen on stable Ubuntu repositories is very old. So, we use get the binary from the website itself
          installationInfo = await setupBin("doxygen", version, getDoxygenPackageInfo, setupDir, arch)
          await setupAptPack([{ name: "libclang-cpp9" }])
        } catch (err) {
          notice(`Failed to download doxygen binary. ${err}. Falling back to apt-get.`)
          installationInfo = await setupAptPack([{ name: "doxygen" }])
        }
      } else {
        throw new Error(`Unsupported linux distributions`)
      }
      await setupGraphviz(getVersion("graphviz", undefined), "", arch)
      return installationInfo
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}

async function activateWinDoxygen() {
  switch (process.platform) {
    case "win32": {
      for (const binDir of [
        "C:/ProgramData/chocolatey/bin",
        "C:/Program Files/doxygen/bin",
        "C:/Program Files (x86)/doxygen",
      ]) {
        if (await pathExists(join(binDir, "doxygen.exe"))) {
          // eslint-disable-next-line no-await-in-loop
          await addPath(binDir)
          return binDir
        }
      }
      throw new Error("Failed to find doxygen binary")
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
