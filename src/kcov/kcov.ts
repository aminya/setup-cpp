import path, { join } from "path"
import { fileURLToPath } from "url"
import { info } from "ci-log"
import { execa } from "execa"
import { addExeExt } from "patha"
import { installAptPack } from "setup-apt"
import { untildifyUser } from "untildify-user"
import which from "which"
import { setupCmake } from "../cmake/cmake.js"
import { setupNinja } from "../ninja/ninja.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { ubuntuVersion } from "../utils/env/ubuntu_version.js"
import { extractTarByExe } from "../utils/setup/extract.js"
import { type InstallationInfo, type PackageInfo, setupBin } from "../utils/setup/setupBin.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"
import { addVPrefix, removeVPrefix } from "../utils/setup/version.js"
import { getVersion } from "../versions/versions.js"

const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

function getDownloadKcovPackageInfo(version: string): PackageInfo {
  return {
    url: `https://github.com/SimonKagstrom/kcov/releases/download/${version}/kcov-amd64.tar.gz`,
    extractedFolderName: "",
    binRelativeDir: "usr/local/bin",
    binFileName: addExeExt("kcov"),
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
  const out = await extractTarByExe(file, dest, 1)

  // build after extraction using CMake
  const cmake = await getCmake()

  if (process.platform === "linux") {
    if (isArch()) {
      await Promise.all([setupPacmanPack("libdwarf"), setupPacmanPack("libcurl-openssl")])
    } else if (hasDnf()) {
      await setupDnfPack([{ name: "libdwarf-devel" }, { name: "libcurl-devel" }])
    } else if (isUbuntu()) {
      await installAptPack([{ name: "libdw-dev" }, { name: "libcurl4-openssl-dev" }])
    }
  }

  // apply gcc13.patch
  try {
    if (which.sync("patch", { nothrow: true }) !== null) {
      const patch = join(dirname, "gcc13.patch")
      await execa("patch", ["-N", "-p1", "-i", patch], { cwd: out, stdio: "inherit" })
    } else {
      info("`patch` not found, skipping gcc13.patch, kcov may not build on gcc 13")
    }
  } catch {
    // ignore
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
    const { binDir } = await setupCmake(
      getVersion("cmake", undefined, await ubuntuVersion()),
      join(untildifyUser("~"), "cmake"),
      "",
    )
    cmake = join(binDir, "cmake")
  }
  const ninja = which.sync("ninja", { nothrow: true })
  if (ninja === null) {
    await setupNinja(getVersion("ninja", undefined, await ubuntuVersion()), join(untildifyUser("~"), "ninja"), "")
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
      await setupPacmanPack("binutils")
    } else if (hasDnf()) {
      await setupDnfPack([{ name: "binutils" }])
    } else if (isUbuntu()) {
      await installAptPack([{ name: "libbinutils" }])
    }
    return installationInfo
  } else {
    installationInfo = await setupBin("kcov", version, getBuildKcovPackageInfo, setupDir, arch)
  }
  return installationInfo
}
