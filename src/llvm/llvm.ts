import path, { delimiter, join } from "path"
import { fileURLToPath } from "url"
import { GITHUB_ACTIONS } from "ci-info"
import { info, warning } from "ci-log"
import { addEnv } from "envosman"
import memoize from "memoizee"
import { pathExists } from "path-exists"
import { addExeExt } from "patha"
import { addUpdateAlternativesToRc, installAptPack } from "setup-apt"
import { rcOptions } from "../cli-options.js"
import { setupGcc } from "../gcc/gcc.js"
import { setupMacOSSDK } from "../macos-sdk/macos-sdk.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { ubuntuVersion } from "../utils/env/ubuntu_version.js"
import { type InstallationInfo, setupBin } from "../utils/setup/setupBin.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"
import { semverCoerceIfInvalid } from "../utils/setup/version.js"
import { getVersion } from "../versions/versions.js"
import { LLVMPackages, setupLLVMApt } from "./llvm_installer.js"
import { getLLVMPackageInfo } from "./llvm_url.js"

const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export async function setupLLVM(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  const installationInfo = await setupLLVMWithoutActivation(version, setupDir, arch)
  await activateLLVM(installationInfo.installDir ?? setupDir)
  return installationInfo
}

async function setupLLVMWithoutActivation_raw(version: string, setupDir: string, arch: string) {
  // install LLVM
  const [installationInfo, _1] = await Promise.all([
    setupLLVMOnly(version, setupDir, arch),
    addLLVMLoggingMatcher(),
  ])

  // install LLVM dependencies
  await setupLLVMDeps(arch)

  return installationInfo
}
const setupLLVMWithoutActivation = memoize(setupLLVMWithoutActivation_raw, { promise: true })

/**
 * Setup clang-format
 *
 * This uses the LLVM installer on Ubuntu, and the LLVM binaries on other platforms
 */
export function setupClangFormat(version: string, setupDir: string, arch: string) {
  return setupLLVMOnly(version, setupDir, arch, LLVMPackages.ClangFormat)
}

/** Setup llvm tools (clang tidy, etc.) without activating llvm and using it as the compiler */
export function setupClangTools(version: string, setupDir: string, arch: string) {
  return setupLLVMOnly(version, setupDir, arch)
}

async function setupLLVMOnly(
  version: string,
  setupDir: string,
  arch: string,
  packages: LLVMPackages = LLVMPackages.All,
) {
  const coeredVersion = semverCoerceIfInvalid(version)
  const majorVersion = Number.parseInt(coeredVersion.split(".")[0], 10)
  try {
    if (isUbuntu()) {
      return await setupLLVMApt(majorVersion, packages)
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
      await installAptPack([{ name: "libtinfo5" }])
    } else {
      await installAptPack([{ name: "libtinfo-dev" }])
    }
  } else if (isArch()) {
    // https://aur.archlinux.org/packages/ncurses5-compat-libs
    await setupPacmanPack("ncurses5-compat-libs", undefined, "yay")
  } else if (hasDnf()) {
    // https://packages.fedoraproject.org/pkgs/ncurses/ncurses-compat-libs/index.html
    await setupDnfPack([
      { name: "ncurses-compat-libs" },
    ])
  }
}
const llvmBinaryDeps = memoize(llvmBinaryDeps_raw, { promise: true })

async function setupLLVMDeps_raw(arch: string) {
  if (process.platform === "linux") {
    // using llvm requires ld, an up to date libstdc++, etc. So, install gcc first,
    // but with a lower priority than the one used by activateLLVM()
    await setupGcc(getVersion("gcc", undefined, await ubuntuVersion()), "", arch, 40)
  }
}
const setupLLVMDeps = memoize(setupLLVMDeps_raw, { promise: true })

export async function activateLLVM(directory: string) {
  const ld = process.env.LD_LIBRARY_PATH ?? ""
  const dyld = process.env.DYLD_LIBRARY_PATH ?? ""

  const actPromises: Promise<void>[] = [
    // the output of this action
    addEnv("LLVM_PATH", directory, rcOptions),

    // Setup LLVM as the compiler
    addEnv("LD_LIBRARY_PATH", `${directory}/lib${delimiter}${ld}`, rcOptions),
    addEnv("DYLD_LIBRARY_PATH", `${directory}/lib${delimiter}${dyld}`, rcOptions),

    // compiler flags
    addEnv("LDFLAGS", `-L"${directory}/lib"`, rcOptions),
    addEnv("CPPFLAGS", `-I"${directory}/include"`, rcOptions),

    // compiler paths
    addEnv("CC", addExeExt(`${directory}/bin/clang`), rcOptions),
    addEnv("CXX", addExeExt(`${directory}/bin/clang++`), rcOptions),

    addEnv("LIBRARY_PATH", `${directory}/lib`, rcOptions),

    // os sdks
    setupMacOSSDK(),
  ]

  // TODO Causes issues with clangd
  // TODO Windows builds fail with llvm's CPATH
  // if (process.platform !== "win32") {
  //   if (await pathExists(`${directory}/lib/clang/${version}/include`)) {
  //     promises.push(addEnv("CPATH", `${directory}/lib/clang/${version}/include`, rcOptions))
  //   } else if (await pathExists(`${directory}/lib/clang/${llvmMajor}/include`)) {
  //     promises.push(addEnv("CPATH", `${directory}/lib/clang/${llvmMajor}/include`, rcOptions))
  //   }
  // }

  if (isUbuntu()) {
    const priority = 60
    actPromises.push(
      addUpdateAlternativesToRc("cc", `${directory}/bin/clang`, rcOptions, priority),
      addUpdateAlternativesToRc("cxx", `${directory}/bin/clang++`, rcOptions, priority),
      addUpdateAlternativesToRc("clang", `${directory}/bin/clang`, rcOptions),
      addUpdateAlternativesToRc("clang++", `${directory}/bin/clang++`, rcOptions),
      addUpdateAlternativesToRc("lld", `${directory}/bin/lld`, rcOptions),
      addUpdateAlternativesToRc("ld.lld", `${directory}/bin/ld.lld`, rcOptions),
      addUpdateAlternativesToRc("llvm-ar", `${directory}/bin/llvm-ar`, rcOptions),
    )
  }

  await Promise.all(actPromises)
}

async function addLLVMLoggingMatcher() {
  if (GITHUB_ACTIONS) {
    const matcherPath = join(dirname, "llvm_matcher.json")
    if (!(await pathExists(matcherPath))) {
      return warning("the llvm_matcher.json file does not exist in the same folder as setup-cpp.js")
    }
    info(`::add-matcher::${matcherPath}`)
  }
}
