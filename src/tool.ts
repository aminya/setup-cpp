import { endGroup, startGroup } from "@actions/core"
import { error } from "ci-log"
import { join } from "patha"
import { setupBazel } from "./bazel/bazel"
import { setupBrew } from "./brew/brew"
import { setupCcache } from "./ccache/ccache"
import { setupChocolatey } from "./chocolatey/chocolatey"
import { getSuccessMessage } from "./cli-options"
import { setupCmake } from "./cmake/cmake"
import { setupConan } from "./conan/conan"
import { setupCppcheck } from "./cppcheck/cppcheck"
import { setupDoxygen } from "./doxygen/doxygen"
import { setupGcc } from "./gcc/gcc"
import { setupGcovr } from "./gcovr/gcovr"
import { setupGraphviz } from "./graphviz/graphviz"
import { setupKcov } from "./kcov/kcov"
import { setupClangTools, setupLLVM } from "./llvm/llvm"
import { setupMake } from "./make/make"
import { setupMeson } from "./meson/meson"
import { setupMSVC } from "./msvc/msvc"
import { setupNala } from "./nala/nala"
import { setupNinja } from "./ninja/ninja"
import { setupOpencppcoverage } from "./opencppcoverage/opencppcoverage"
import { setupPowershell } from "./powershell/powershell"
import { setupPython } from "./python/python"
import { setupSccache } from "./sccache/sccache"
import { setupSevenZip } from "./sevenzip/sevenzip"
import { setupTask } from "./task/task"
import { InstallationInfo } from "./utils/setup/setupBin"
import { setupVcpkg } from "./vcpkg/vcpkg"
import { setupVCVarsall } from "./vcvarsall/vcvarsall"
import { getVersion } from "./versions/versions"
import pTimeout from "p-timeout"

/** The setup functions */
export const setups = {
  nala: setupNala,
  cmake: setupCmake,
  ninja: setupNinja,
  python: setupPython,
  vcpkg: setupVcpkg,
  bazel: setupBazel,
  conan: setupConan,
  meson: setupMeson,
  gcovr: setupGcovr,
  opencppcoverage: setupOpencppcoverage,
  llvm: setupLLVM,
  gcc: setupGcc,
  choco: setupChocolatey,
  brew: setupBrew,
  powershell: setupPowershell,
  ccache: setupCcache,
  sccache: setupSccache,
  doxygen: setupDoxygen,
  graphviz: setupGraphviz,
  cppcheck: setupCppcheck,
  clangtidy: setupClangTools,
  clangformat: setupClangTools,
  msvc: setupMSVC,
  vcvarsall: setupVCVarsall,
  kcov: setupKcov,
  make: setupMake,
  task: setupTask,
  sevenzip: setupSevenZip,
}

export type ToolName = keyof typeof setups

/** The tools that can be installed */
export const tools = Object.keys(setups) as Array<ToolName>

export async function installTool(
  tool: ToolName,
  version: string,
  osVersion: number[] | null,
  arch: string,
  setupCppDir: string,
  successMessages: string[],
  errorMessages: string[],
  timeout: number = 0.1,
) {
  startGroup(`Installing ${tool} ${version}`)
  let hasLLVM = false
  try {
    hasLLVM = await pTimeout(installToolImpl(tool, version, osVersion, arch, hasLLVM, setupCppDir, successMessages), {
      milliseconds: timeout * 60 * 1000,
    })
  } catch (e) {
    // push error message to the logger
    error(e as string | Error)
    errorMessages.push(`${tool} failed to install`)
  }
  endGroup()
  return hasLLVM
}

async function installToolImpl(
  tool: ToolName,
  version: string,
  osVersion: number[] | null,
  arch: string,
  hasLLVM: boolean,
  setupCppDir: string,
  successMessages: string[],
) {
  let installationInfo: InstallationInfo | undefined | void
  if (tool === "vcvarsall") {
    // eslint-disable-next-line no-await-in-loop
    await setupVCVarsall(getVersion(tool, version, osVersion), undefined, arch, undefined, undefined, false, false)
  } else {
    // get the setup function
    const setupFunction = setups[tool]

    // eslint-disable-next-line no-param-reassign
    hasLLVM = ["llvm", "clangformat", "clangtidy"].includes(tool)

    // the tool installation directory (for the functions that ue it)
    const setupDir = join(setupCppDir, hasLLVM ? "llvm" : tool)

    // eslint-disable-next-line no-await-in-loop
    installationInfo = await setupFunction(getVersion(tool, version, osVersion), setupDir, arch)
  }
  // preparing a report string
  successMessages.push(getSuccessMessage(tool, installationInfo))
  return hasLLVM
}
