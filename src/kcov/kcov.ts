import execa from "execa"
// import { join } from "path"
// import { untildify_user as untildify } from "./utils/path/untildify"
// import { setupCmake } from "../cmake/cmake"
import { execaSudo } from "../utils/env/sudo"
import { addBinExtension } from "../utils/extension/extension"
import { extractTarByExe } from "../utils/setup/extract"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { PackageInfo, setupBin } from "../utils/setup/setupBin"

function getKcovPackageInfo(version: string): PackageInfo {
  const version_number = parseInt(version.replace(/^v/, ""), 10)
  if (version_number === 38) {
    // eslint-disable-next-line no-param-reassign
    version = "v38"
  }
  if (version_number >= 39) {
    return {
      url: `https://github.com/SimonKagstrom/kcov/releases/download/${version}/kcov-amd64.tar.gz`,
      extractedFolderName: "",
      binRelativeDir: "usr/local/bin",
      binFileName: addBinExtension("kcov"),
      extractFunction: (file: string, dest: string) => {
        return extractTarByExe(file, dest, ["--strip-components=0"])
      },
    }
  } else {
    return {
      url: `https://github.com/SimonKagstrom/kcov/archive/refs/tags/${version}.tar.gz`,
      extractedFolderName: `kcov-${version_number}`,
      binRelativeDir: "build/",
      binFileName: addBinExtension("kcov"),
      extractFunction: async (file: string, dest: string): Promise<string> => {
        const out = await extractTarByExe(file, dest)
        // build after extraction using CMake
        // await setupCmake("3.22.0", join(untildify(""), "cmake"), "")
        await setupAptPack("libdw-dev")
        await setupAptPack("libcurl4-openssl-dev")
        await execa("cmake", ["-S", "./", "-B", "./build"], { cwd: out })
        await execa("cmake", ["--build", "./build", "--config", "Release"], { cwd: out })
        await execaSudo("cmake", ["--install", "./build"], out)
        return out
      },
    }
  }
}

export async function setupKcov(version: string, setupDir: string, arch: string) {
  switch (process.platform) {
    case "linux": {
      const installationInfo = await setupBin("kcov", version, getKcovPackageInfo, setupDir, arch)
      return installationInfo
    }
    default: {
      throw new Error(`Unsupported platform for ${arch}`)
    }
  }
}
