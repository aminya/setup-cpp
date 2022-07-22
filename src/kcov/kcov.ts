import execa from "execa"
import { join } from "path"
import untildify from "untildify"
import which from "which"
import { setupCmake } from "../cmake/cmake"
import { getVersion } from "../default_versions"
import { execSudo } from "../utils/exec/sudo"
import { addBinExtension } from "../utils/extension/extension"
import { extractTarByExe } from "../utils/setup/extract"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"
import { InstallationInfo, PackageInfo, setupBin } from "../utils/setup/setupBin"
import { isArch } from "../utils/env/isArch"
import { hasDnf } from "../utils/env/hasDnf"
import { setupDnfPack } from "../utils/setup/setupDnfPack"
import { isUbuntu } from "../utils/env/isUbuntu"
import { addVPrefix, removeVPrefix } from "../utils/setup/version"
import { info } from "../utils/io/io"

function getDownloadKcovPackageInfo(version_number: string): PackageInfo {
  return {
    url: `https://github.com/SimonKagstrom/kcov/releases/download/v${version_number}/kcov-amd64.tar.gz`,
    extractedFolderName: "",
    binRelativeDir: "usr/local/bin",
    binFileName: addBinExtension("kcov"),
    extractFunction: extractTarByExe,
  }
}

function getBuildKcovPackageInfo(version: string): PackageInfo {
  const version_number = removeVPrefix(version)
  return {
    url: `https://github.com/SimonKagstrom/kcov/archive/refs/tags/${version}.tar.gz`,
    extractedFolderName: `kcov-${version_number}`,
    binRelativeDir: "build/",
    binFileName: addBinExtension("kcov"),
    extractFunction: buildKcov,
  }
}

async function buildKcov(file: string, dest: string) {
  const out = await extractTarByExe(file, dest, ["--strip-components=1"])
  // build after extraction using CMake
  if (which.sync("cmake", { nothrow: true }) === null) {
    await setupCmake(getVersion("cmake", undefined), join(untildify(""), "cmake"), "")
  }
  if (process.platform === "linux") {
    if (isArch()) {
      setupPacmanPack("libdwarf")
      setupPacmanPack("libcurl-openssl")
    } else if (hasDnf()) {
      setupDnfPack("libdwarf-devel")
      setupDnfPack("libcurl-devel")
    } else if (isUbuntu()) {
      setupAptPack("libdw-dev")
      setupAptPack("libcurl4-openssl-dev")
    }
  }
  await execa("cmake", ["-S", "./", "-B", "./build"], { cwd: out, stdio: "inherit" })
  await execa("cmake", ["--build", "./build", "--config", "Release"], { cwd: out, stdio: "inherit" })
  execSudo("cmake", ["--install", "./build"], out)
  return out
}

export async function setupKcov(versionGiven: string, setupDir: string, arch: string) {
  if (process.platform === "win32") {
    info("Kcov is not supported on Windows")
    return
  }

  // parse version
  const versionSplit = versionGiven.split("-")
  let version = addVPrefix(versionSplit[0])
  const installMethod = versionSplit[1] as "binary" | undefined
  const version_number = removeVPrefix(version)
  // fix inconsistency in tagging
  if (version_number === 38) {
    version = "v38"
  }

  let installationInfo: InstallationInfo
  if (installMethod === "binary" && version_number >= 39) {
    installationInfo = await setupBin("kcov", version, getDownloadKcovPackageInfo, setupDir, arch)
    if (isArch()) {
      setupPacmanPack("binutils")
    } else if (hasDnf()) {
      setupDnfPack("binutils")
    } else if (isUbuntu()) {
      setupAptPack("libbinutils")
    }
    return installationInfo
  } else {
    installationInfo = await setupBin("kcov", version, getBuildKcovPackageInfo, setupDir, arch)
  }
  return installationInfo
}
