import { join, addExeExt } from "patha"
import { delimiter } from "path"
import semverMajor from "semver/functions/major"
import { InstallationInfo, setupBin } from "../utils/setup/setupBin"
import { semverCoerceIfInvalid } from "../utils/setup/version"
import { setupMacOSSDK } from "../macos-sdk/macos-sdk"
import { addEnv } from "../utils/env/addEnv"
import { setupAptPack, updateAptAlternatives } from "../utils/setup/setupAptPack"
import { info, warning } from "ci-log"

import ciDetect from "@npmcli/ci-detect"
import { setupGcc } from "../gcc/gcc"
import { getVersion } from "../versions/versions"
import { isUbuntu } from "../utils/env/isUbuntu"
import { getLLVMPackageInfo } from "./llvm_url"
import { ubuntuVersion } from "../utils/env/ubuntu_version"
import { pathExists } from "path-exists"

export async function setupLLVM(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  const installationInfo = await setupLLVMWithoutActivation(version, setupDir, arch)
  await activateLLVM(installationInfo.installDir ?? setupDir, version)
  return installationInfo
}

let installedDeps = false

async function setupLLVMWithoutActivation(version: string, setupDir: string, arch: string) {
  const installationInfoPromise = setupBin("llvm", version, getLLVMPackageInfo, setupDir, arch)

  let depsPromise: Promise<void>
  if (!installedDeps) {
    depsPromise = setupLLVMDeps(arch, version)
    // eslint-disable-next-line require-atomic-updates
    installedDeps = true
  } else {
    depsPromise = Promise.resolve()
  }

  // install LLVM and its dependencies in parallel
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [installationInfo, _] = await Promise.all([installationInfoPromise, depsPromise])

  return installationInfo
}

async function setupLLVMDeps(arch: string, version: string) {
  if (process.platform === "linux") {
    // install llvm build dependencies
    const osVersion = await ubuntuVersion()
    await setupGcc(getVersion("gcc", undefined, osVersion), "", arch) // using llvm requires ld, an up to date libstdc++, etc. So, install gcc first

    if (isUbuntu()) {
      const majorVersion = parseInt(version.split(".")[0], 10)
      if (majorVersion <= 10) {
        await setupAptPack("libtinfo5")
      } else {
        await setupAptPack("libtinfo-dev")
      }
    }
    // TODO: install libtinfo on other distros
    // setupPacmanPack("ncurses")
  }
}

export async function activateLLVM(directory: string, versionGiven: string) {
  const version = semverCoerceIfInvalid(versionGiven)

  const lib = join(directory, "lib")

  const ld = process.env.LD_LIBRARY_PATH ?? ""
  const dyld = process.env.DYLD_LIBRARY_PATH ?? ""

  const promises = [
    // the output of this action
    addEnv("LLVM_PATH", directory),

    // Setup LLVM as the compiler
    addEnv("LD_LIBRARY_PATH", `${lib}${delimiter}${ld}`),
    addEnv("DYLD_LIBRARY_PATH", `${lib}${delimiter}${dyld}`),

    // compiler flags
    addEnv("LDFLAGS", `-L"${directory}/lib"`),
    addEnv("CPPFLAGS", `-I"${directory}/include"`),

    // compiler paths
    addEnv("CC", addExeExt(`${directory}/bin/clang`)),
    addEnv("CXX", addExeExt(`${directory}/bin/clang++`)),

    addEnv("LIBRARY_PATH", `${directory}/lib`),

    // os sdks
    setupMacOSSDK(),
  ]

  // windows builds fail with llvm's CPATH
  if (process.platform !== "win32") {
    const llvmMajor = semverMajor(version)
    if (await pathExists(`${directory}/lib/clang/${version}/include`)) {
      promises.push(addEnv("CPATH", `${directory}/lib/clang/${version}/include`))
    } else if (await pathExists(`${directory}/lib/clang/${llvmMajor}/include`)) {
      promises.push(addEnv("CPATH", `${directory}/lib/clang/${llvmMajor}/include`))
    }
  }

  if (isUbuntu()) {
    await updateAptAlternatives("cc", `${directory}/bin/clang`)
    await updateAptAlternatives("cxx", `${directory}/bin/clang++`)
    await updateAptAlternatives("clang", `${directory}/bin/clang`)
    await updateAptAlternatives("clang++", `${directory}/bin/clang++`)
    await updateAptAlternatives("lld", `${directory}/bin/lld`)
    await updateAptAlternatives("ld.lld", `${directory}/bin/ld.lld`)
    await updateAptAlternatives("llvm-ar", `${directory}/bin/llvm-ar`)
  }

  if (ciDetect() === "github-actions") {
    await addLLVMLoggingMatcher()
  }

  await Promise.all(promises)
}

/** Setup llvm tools (clang tidy, clang format, etc) without activating llvm and using it as the compiler */
export async function setupClangTools(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  if (ciDetect() === "github-actions") {
    await addLLVMLoggingMatcher()
  }
  return setupLLVMWithoutActivation(version, setupDir, arch)
}

async function addLLVMLoggingMatcher() {
  const matcherPath = join(__dirname, "llvm_matcher.json")
  if (!(await pathExists(matcherPath))) {
    return warning("the llvm_matcher.json file does not exist in the same folder as setup_cpp.js")
  }
  info(`::add-matcher::${matcherPath}`)
}
