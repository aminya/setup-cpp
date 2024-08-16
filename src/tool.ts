import { setupBazel } from "./bazel/bazel.js"
import { setupBrew } from "./brew/brew.js"
import { setupCcache } from "./ccache/ccache.js"
import { setupChocolatey } from "./chocolatey/chocolatey.js"
import { setupCmake } from "./cmake/cmake.js"
import { setupConan } from "./conan/conan.js"
import { setupCppcheck } from "./cppcheck/cppcheck.js"
import { setupDoxygen } from "./doxygen/doxygen.js"
import { setupGcc } from "./gcc/gcc.js"
import { setupGcovr } from "./gcovr/gcovr.js"
import { setupGraphviz } from "./graphviz/graphviz.js"
import { setupKcov } from "./kcov/kcov.js"
import { setupClangFormat, setupClangTools, setupLLVM } from "./llvm/llvm.js"
import { setupMake } from "./make/make.js"
import { setupMeson } from "./meson/meson.js"
import { setupMSVC } from "./msvc/msvc.js"
import { setupNala } from "./nala/nala.js"
import { setupNinja } from "./ninja/ninja.js"
import { setupOpencppcoverage } from "./opencppcoverage/opencppcoverage.js"
import { setupPowershell } from "./powershell/powershell.js"
import { setupPython } from "./python/python.js"
import { setupSccache } from "./sccache/sccache.js"
import { setupSevenZip } from "./sevenzip/sevenzip.js"
import { setupTask } from "./task/task.js"
import { setupVcpkg } from "./vcpkg/vcpkg.js"
import { setupVCVarsall } from "./vcvarsall/vcvarsall.js"

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
