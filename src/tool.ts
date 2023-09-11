import { setupBazel } from "./bazel/bazel"
import { setupBrew } from "./brew/brew"
import { setupCcache } from "./ccache/ccache"
import { setupChocolatey } from "./chocolatey/chocolatey"
import { setupCmake } from "./cmake/cmake"
import { setupConan } from "./conan/conan"
import { setupCppcheck } from "./cppcheck/cppcheck"
import { setupDoxygen } from "./doxygen/doxygen"
import { setupGcc } from "./gcc/gcc"
import { setupGcovr } from "./gcovr/gcovr"
import { setupGraphviz } from "./graphviz/graphviz"
import { setupKcov } from "./kcov/kcov"
import { setupClangTools, setupLLVM, setupClangFormat } from "./llvm/llvm"
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
import { setupVcpkg } from "./vcpkg/vcpkg"
import { setupVCVarsall } from "./vcvarsall/vcvarsall"

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
  clangformat: setupClangFormat,
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

/** The possible inputs to the program */
export type Inputs = keyof typeof setups | "compiler" | "architecture" | "timeout"

/** ‌ an array of possible inputs */
export const inputs: Array<Inputs> = ["compiler", "architecture", "timeout", ...tools]
