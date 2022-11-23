import execa from "execa"
import { join, addExeExt } from "patha"
import which from "which"
import { setupCmake } from "../cmake/cmake"
import { getVersion } from "../versions/versions"
import { extractTarByExe } from "../utils/setup/extract"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"
import { InstallationInfo, PackageInfo, setupBin } from "../utils/setup/setupBin"
import { isArch } from "../utils/env/isArch"
import { hasDnf } from "../utils/env/hasDnf"
import { setupDnfPack } from "../utils/setup/setupDnfPack"
import { isUbuntu } from "../utils/env/isUbuntu"
import { addVPrefix, removeVPrefix } from "../utils/setup/version"
import { info } from "ci-log"
import { untildifyUser } from "untildify-user"
import { setupNinja } from "../ninja/ninja"

function getDownloadKcovPackageInfo(version: string): PackageInfo {
  return {
    url: `https://github.com/SimonKagstrom/kcov/releases/download/${version}/kcov-amd64.tar.gz`,
    extractedFolderName: "",
    binRelativeDir: "usr/local/bin",
    binFileName: addExeExt("kcov"),
    extractFunction: extractTarByExe,
  }
}

function getBuildKcovPackageInfo(version: string): PackageInfo {
  return {
    url: `https://github.com/SimonKagstrom/kcov/archive/refs/tags/${version}.tar.gz`,
    extractedFolderName: "",
    binRelativeDir: "build/src",
    binFileName: addExeExt("kcov"),
    extractFunction: buildKcov,
  }
}

async function buildKcov(file: string, dest: string) {
  const out = await extractTarByExe(file, dest, ["--strip-components=1"])

  // build after extraction using CMake
  const cmake = await getCmake()

  if (process.platform === "linux") {
    if (isArch()) {
      setupPacmanPack("libdwarf")
      setupPacmanPack("libcurl-openssl")
    } else if (hasDnf()) {
      setupDnfPack("libdwarf-devel")
      setupDnfPack("libcurl-devel")
    } else if (isUbuntu()) {
      await setupAptPack([{ name: "libdw-dev" }, { name: "libcurl4-openssl-dev" }])
    }
  }
  const buildDir = join(out, "build")
  await execa(cmake, ["-S", out, "-B", buildDir, "-DCMAKE_BUILD_TYPE=Release", "-G", "Ninja"], {
    cwd: out,
    stdio: "inherit",
  })
  await execa(cmake, ["--build", buildDir, "--config", "Release"], { cwd: out, stdio: "inherit" })
  //   execRootSync(cmake, ["--install", buildDir], out)
  //   return "user/local/bin" // the cmake install prefix
  return out
}

async function getCmake() {
  let cmake = which.sync("cmake", { nothrow: true })
  if (cmake === null) {
    const { binDir } = await setupCmake(getVersion("cmake", undefined), join(untildifyUser(""), "cmake"), "")
    cmake = join(binDir, "cmake")
  }
  const ninja = which.sync("ninja", { nothrow: true })
  if (ninja === null) {
    await setupNinja(getVersion("ninja", undefined), join(untildifyUser(""), "ninja"), "")
  }
  return cmake
}

export async function setupKcov(versionGiven: string, setupDir: string, arch: string) {
  if (process.platform !== "linux") {
    info("Kcov is not supported on non-linux")
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
      await setupAptPack([{ name: "libbinutils" }])
    }
    return installationInfo
  } else {
    installationInfo = await setupBin("kcov", version, getBuildKcovPackageInfo, setupDir, arch)
  }
  return installationInfo
}
