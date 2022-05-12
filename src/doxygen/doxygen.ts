import { addPath } from "../utils/env/addEnv"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { InstallationInfo, PackageInfo, setupBin } from "../utils/setup/setupBin"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { addBinExtension } from "../utils/extension/extension"
import { extractTar, extractZip } from "../utils/setup/extract"
import { notice } from "../utils/io/io"
import { setupGraphviz } from "../graphviz/graphviz"
import { getVersion } from "../default_versions"
import { existsSync } from "fs"

/** Get the platform data for cmake */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDoxygenPackageInfo(version: string, platform: NodeJS.Platform, _arch: string): PackageInfo {
  switch (platform) {
    case "linux": {
      const folderName = `doxygen-${version}`
      return {
        binRelativeDir: "bin/",
        binFileName: addBinExtension("doxygen"),
        extractedFolderName: folderName,
        extractFunction: extractTar,
        url: `https://www.doxygen.nl/files/${folderName}.linux.bin.tar.gz`,
      }
    }
    case "win32": {
      const folderName = `doxygen-${version}`
      return {
        binRelativeDir: "",
        binFileName: addBinExtension("doxygen"),
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
      const installationInfo = setupBrewPack("doxygen", undefined)
      await setupGraphviz(getVersion("graphviz", undefined), "", arch)
      return installationInfo
    }
    case "linux": {
      let installationInfo: InstallationInfo
      try {
        // doxygen on stable Ubuntu repositories is very old. So, we use get the binary from the website itself
        installationInfo = await setupBin("doxygen", version, getDoxygenPackageInfo, setupDir, arch)
        setupAptPack("libclang-cpp9")
      } catch (err) {
        notice(`Failed to download doxygen binary. ${err}. Falling back to apt-get.`)
        installationInfo = setupAptPack("doxygen", undefined)
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
        if (existsSync(binDir)) {
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
