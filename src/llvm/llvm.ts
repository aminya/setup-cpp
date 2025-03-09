import path, { delimiter, join } from "path"
import { fileURLToPath } from "url"
import ciInfo from "ci-info"
const { GITHUB_ACTIONS } = ciInfo
import { info, warning } from "ci-log"
import { addEnv } from "envosman"
import memoize from "memoizee"
import { pathExists } from "path-exists"
import { addExeExt } from "patha"
import { addUpdateAlternativesToRc } from "setup-apt"
import { rcOptions } from "../cli-options.js"
import { setupGcc } from "../gcc/gcc.js"
import { setupMacOSSDK } from "../macos-sdk/macos-sdk.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { ubuntuVersion } from "../utils/env/ubuntu_version.js"
import type { InstallationInfo } from "../utils/setup/setupBin.js"
import { quoteIfHasSpace } from "../utils/std/index.js"
import { getVersion } from "../versions/versions.js"
import { LLVMPackages, trySetupLLVMApt } from "./llvm_apt_installer.js"
import { setupLLVMBin } from "./llvm_bin.js"
import { majorLLVMVersion } from "./utils.js"

const dirname = typeof __dirname === "string" ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export async function setupLLVM(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  const installationInfo = await setupLLVMWithoutActivation(version, setupDir, arch)
  await activateLLVM(installationInfo.installDir ?? setupDir, version)
  return installationInfo
}

async function setupLLVMWithoutActivation_(version: string, setupDir: string, arch: string) {
  // install LLVM
  const [installationInfo, _1] = await Promise.all([
    setupLLVMOnly(version, setupDir, arch),
    addLLVMLoggingMatcher(),
  ])

  // install LLVM dependencies
  await setupGccForLLVM(arch)

  return installationInfo
}
const setupLLVMWithoutActivation = memoize(setupLLVMWithoutActivation_, { promise: true })

async function setupLLVMOnly(
  version: string,
  setupDir: string,
  arch: string,
  packages: LLVMPackages = LLVMPackages.All,
) {
  const aptInstallInfo = await trySetupLLVMApt(version, packages)
  if (aptInstallInfo !== undefined) {
    return aptInstallInfo
  }

  return setupLLVMBin(version, setupDir, arch)
}

async function setupGccForLLVM_(arch: string) {
  if (process.platform === "linux") {
    // using llvm requires ld, an up to date libstdc++, etc. So, install gcc first,
    // but with a lower priority than the one used by activateLLVM()
    await setupGcc(getVersion("gcc", undefined, await ubuntuVersion()), "", arch, 40)
  }
}
const setupGccForLLVM = memoize(setupGccForLLVM_, { promise: true })

export async function activateLLVM(directory: string, version: string) {
  const ld = process.env.LD_LIBRARY_PATH ?? ""
  const dyld = process.env.DYLD_LIBRARY_PATH ?? ""

  const llvmMajor = majorLLVMVersion(version)

  const actPromises: Promise<void>[] = [
    // compiler paths
    addEnv("CC", addExeExt(`${directory}/bin/clang`), rcOptions),
    addEnv("CXX", addExeExt(`${directory}/bin/clang++`), rcOptions),

    // the output of this action
    addEnv("LLVM_PATH", directory, rcOptions),

    // Setup LLVM as the compiler
    addEnv("LD_LIBRARY_PATH", `${ld}${delimiter}${directory}/lib`, rcOptions),
    addEnv("DYLD_LIBRARY_PATH", `${dyld}${delimiter}${directory}/lib`, rcOptions),

    // compiler flags
    addEnv("LLVM_LDFLAGS", `-L${quoteIfHasSpace(`${directory}/lib`)}`, rcOptions),
    addEnv("LLVM_CPPFLAGS", `-I${quoteIfHasSpace(`${directory}/include`)}`, rcOptions),

    // CPATH
    await pathExists(`${directory}/lib/clang/${version}/include`)
      ? addEnv("LLVM_CPATH", `${directory}/lib/clang/${version}/include`, rcOptions)
      : await pathExists(`${directory}/lib/clang/${llvmMajor}/include`)
      ? addEnv("LLVM_CPATH", `${directory}/lib/clang/${llvmMajor}/include`, rcOptions)
      : Promise.resolve(),

    addEnv("LIBRARY_PATH", `${directory}/lib`, rcOptions),

    // os sdks
    setupMacOSSDK(),
  ]

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
  if (!GITHUB_ACTIONS) {
    return
  }
  const matcherPath = join(dirname, "llvm_matcher.json")
  if (!(await pathExists(matcherPath))) {
    return warning("the llvm_matcher.json file does not exist in the same folder as setup-cpp.js")
  }
  info(`::add-matcher::${matcherPath}`)
}

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
