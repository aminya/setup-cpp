import { addPath } from "../utils/path/addPath"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { PackageInfo, setupBin } from "../utils/setup/setupBin"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { addBinExtension } from "../utils/extension/extension"
import { extractTarByExe } from "../utils/setup/extract"
import { warning } from "../utils/io/io"

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
        extractFunction: (file: string, dest: string) => {
          return extractTarByExe(file, dest, ["--strip-components=1"])
        },
        url: `https://www.doxygen.nl/files/${folderName}.linux.bin.tar.gz`,
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
      await setupChocoPack("graphviz", undefined)
      const binDir = activateWinDoxygen()
      return { binDir }
    }
    case "darwin": {
      setupBrewPack("doxygen", undefined)
      return setupBrewPack("graphviz", undefined)
    }
    case "linux": {
      try {
        // doxygen on stable Ubuntu repositories is very old. So, we use get the binary from the website itself
        await setupBin("doxygen", version, getDoxygenPackageInfo, setupDir, arch)
      } catch (err) {
        warning(`Failed to download doxygen binary. ${err}. Falling back to apt-get.`)
        await setupAptPack("doxygen", undefined)
      }
      return setupAptPack("graphviz", undefined)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}

function activateWinDoxygen() {
  addPath("C:/Program Files/Graphviz/bin")
  const binDir = "C:/Program Files/doxygen/bin"
  addPath(binDir)
  return binDir
}
