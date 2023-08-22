import { GITHUB_ACTIONS } from "ci-info"
import { info, warning } from "ci-log"
import memoize from "micro-memoize"
import { delimiter } from "path"
import { pathExists } from "path-exists"
import { addExeExt, join } from "patha"
import { setupGcc } from "../gcc/gcc"
import { setupMacOSSDK } from "../macos-sdk/macos-sdk"
import { addEnv } from "../utils/env/addEnv"
import { isUbuntu } from "../utils/env/isUbuntu"
import { ubuntuVersion } from "../utils/env/ubuntu_version"
import { setupAptPack, updateAptAlternatives } from "../utils/setup/setupAptPack"
import { InstallationInfo, setupBin } from "../utils/setup/setupBin"
import { semverCoerceIfInvalid } from "../utils/setup/version"
import { getVersion } from "../versions/versions"
import { setupLLVMApt } from "./llvm_installer"
import { getLLVMPackageInfo } from "./llvm_url"

export async function setupLLVM(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  const installationInfo = await setupLLVMWithoutActivation(version, setupDir, arch)
  await activateLLVM(installationInfo.installDir ?? setupDir)
  return installationInfo
}

async function setupLLVMWithoutActivation_raw(version: string, setupDir: string, arch: string) {
  // install LLVM and its dependencies in parallel
  const [installationInfo, _1, _2] = await Promise.all([
    setupLLVMOnly(version, setupDir, arch),
    setupLLVMDeps(arch),
    addLLVMLoggingMatcher(),
  ])

  return installationInfo
}
const setupLLVMWithoutActivation = memoize(setupLLVMWithoutActivation_raw, { isPromise: true })

/** Setup llvm tools (clang tidy, clang format, etc) without activating llvm and using it as the compiler */
export function setupClangTools(version: string, setupDir: string, arch: string) {
  return setupLLVMOnly(version, setupDir, arch)
}

async function setupLLVMOnly(version: string, setupDir: string, arch: string) {
  const coeredVersion = semverCoerceIfInvalid(version)
  const majorVersion = parseInt(coeredVersion.split(".")[0], 10)
  try {
    if (isUbuntu()) {
      return await setupLLVMApt(majorVersion)
    }
  } catch (err) {
    info(`Failed to install llvm via system package manager ${err}`)
  }

  const installationInfo = await setupBin("llvm", version, getLLVMPackageInfo, setupDir, arch)
  await llvmBinaryDeps(majorVersion)
  return installationInfo
}

async function llvmBinaryDeps_raw(majorVersion: number) {
  if (isUbuntu()) {
    if (majorVersion <= 10) {
      await setupAptPack([{ name: "libtinfo5" }])
    } else {
      await setupAptPack([{ name: "libtinfo-dev" }])
    }
  }
}
const llvmBinaryDeps = memoize(llvmBinaryDeps_raw, { isPromise: true })

async function setupLLVMDeps_raw(arch: string) {
  if (process.platform === "linux") {
    // using llvm requires ld, an up to date libstdc++, etc. So, install gcc first
    await setupGcc(getVersion("gcc", undefined, await ubuntuVersion()), "", arch)
  }
}
const setupLLVMDeps = memoize(setupLLVMDeps_raw, { isPromise: true })

export async function activateLLVM(directory: string) {
  const ld = process.env.LD_LIBRARY_PATH ?? ""
  const dyld = process.env.DYLD_LIBRARY_PATH ?? ""

  const actPromises: Promise<any>[] = [
    // the output of this action
    addEnv("LLVM_PATH", directory),

    // Setup LLVM as the compiler
    addEnv("LD_LIBRARY_PATH", `${directory}/lib${delimiter}${ld}`),
    addEnv("DYLD_LIBRARY_PATH", `${directory}/lib${delimiter}${dyld}`),

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

  // TODO Causes issues with clangd
  // TODO Windows builds fail with llvm's CPATH
  // if (process.platform !== "win32") {
  //   if (await pathExists(`${directory}/lib/clang/${version}/include`)) {
  //     promises.push(addEnv("CPATH", `${directory}/lib/clang/${version}/include`))
  //   } else if (await pathExists(`${directory}/lib/clang/${llvmMajor}/include`)) {
  //     promises.push(addEnv("CPATH", `${directory}/lib/clang/${llvmMajor}/include`))
  //   }
  // }

  if (isUbuntu()) {
    actPromises.push(
      updateAptAlternatives("cc", `${directory}/bin/clang`),
      updateAptAlternatives("cxx", `${directory}/bin/clang++`),
      updateAptAlternatives("clang", `${directory}/bin/clang`),
      updateAptAlternatives("clang++", `${directory}/bin/clang++`),
      updateAptAlternatives("lld", `${directory}/bin/lld`),
      updateAptAlternatives("ld.lld", `${directory}/bin/ld.lld`),
      updateAptAlternatives("llvm-ar", `${directory}/bin/llvm-ar`),
    )
  }

  await Promise.all(actPromises)
}

async function addLLVMLoggingMatcher() {
  if (GITHUB_ACTIONS) {
    const matcherPath = join(__dirname, "llvm_matcher.json")
    if (!(await pathExists(matcherPath))) {
      return warning("the llvm_matcher.json file does not exist in the same folder as setup-cpp.js")
    }
    info(`::add-matcher::${matcherPath}`)
  }
}
