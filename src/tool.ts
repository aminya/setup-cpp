import { setupAptFast, setupNala } from "setup-apt"
import { setupBrew } from "setup-brew"
import { setupBazel } from "./bazel/bazel.js"
import { setupCcache } from "./ccache/ccache.js"
import { setupChocolatey } from "./chocolatey/chocolatey.js"
import { setupCmake } from "./cmake/cmake.js"
import { setupCmakelang } from "./cmakelang/cmakelang.js"
import { setupConan } from "./conan/conan.js"
import { setupCppcheck } from "./cppcheck/cppcheck.js"
import { setupCpplint } from "./cpplint/cpplint.js"
import { setupDoxygen } from "./doxygen/doxygen.js"
import { setupFlawfinder } from "./flawfinder/flawfinder.js"
import { setupGcc } from "./gcc/gcc.js"
import { setupMingw } from "./gcc/mingw.js"
import { setupGcovr } from "./gcovr/gcovr.js"
import { setupGit } from "./git/git.js"
import { setupGraphviz } from "./graphviz/graphviz.js"
import { setupInfer } from "./infer/infer.js"
import { setupKcov } from "./kcov/kcov.js"
import { setupLizard } from "./lizard/lizard.js"
import { setupAppleClang } from "./llvm/apple-clang.js"
import { setupClangFormat, setupClangTools, setupLLVM } from "./llvm/llvm.js"
import { setupMake } from "./make/make.js"
import { setupMeson } from "./meson/meson.js"
import { setupMSVC } from "./msvc/msvc.js"
import { setupNinja } from "./ninja/ninja.js"
import { setupOpencppcoverage } from "./opencppcoverage/opencppcoverage.js"
import { setupPowershell } from "./powershell/powershell.js"
import { setupPython } from "./python/python.js"
import { setupSccache } from "./sccache/sccache.js"
import { setupSevenZip } from "./sevenzip/sevenzip.js"
import { setupTask } from "./task/task.js"
import { setupVcpkg } from "./vcpkg/vcpkg.js"
import { setupVCVarsall } from "./vcvarsall/vcvarsall.js"

export const llvmSetups = { llvm: setupLLVM, clang: setupLLVM, "clang++": setupLLVM } as const
export const gccSetups = { gcc: setupGcc, "g++": setupGcc } as const
export const mingwSetups = { mingw: setupMingw } as const
export const msvcSetups = {
  msvc: setupMSVC,
  cl: setupMSVC,
  msbuild: setupMSVC,
  visualstudio: setupMSVC,
} as const
export const appleClangSetups = {
  appleclang: setupAppleClang,
  applellvm: setupAppleClang,
  "apple-clang": setupAppleClang,
  "apple-llvm": setupAppleClang,
} as const

const cmakeLangSetups = {
  cmakelang: setupCmakelang,
  "cmake-lint": setupCmakelang,
  "cmake-format": setupCmakelang,
  cmakelint: setupCmakelang,
  cmakeformat: setupCmakelang,
} as const

export const llvmTools = ["llvm", "clang", "clang++", "clang-tidy", "clang-format", "clangtidy", "clangformat"]

/** The setup functions */
export const setups = {
  "apt-fast": setupAptFast,
  aptfast: setupAptFast,
  nala: setupNala,
  git: setupGit,
  brew: setupBrew,
  choco: setupChocolatey,
  python: setupPython,
  powershell: setupPowershell,
  pwsh: setupPowershell,
  ...llvmSetups,
  ...gccSetups,
  ...mingwSetups,
  ...msvcSetups,
  ...appleClangSetups,
  ...cmakeLangSetups,
  cmake: setupCmake,
  ninja: setupNinja,
  vcpkg: setupVcpkg,
  bazel: setupBazel,
  conan: setupConan,
  meson: setupMeson,
  gcovr: setupGcovr,
  opencppcoverage: setupOpencppcoverage,
  OpenCppCoverage: setupOpencppcoverage,
  ccache: setupCcache,
  sccache: setupSccache,
  doxygen: setupDoxygen,
  graphviz: setupGraphviz,
  cppcheck: setupCppcheck,
  cpplint: setupCpplint,
  flawfinder: setupFlawfinder,
  lizard: setupLizard,
  infer: setupInfer,
  "clang-tidy": setupClangTools,
  clangtidy: setupClangTools,
  "clang-format": setupClangFormat,
  clangformat: setupClangFormat,
  vcvarsall: setupVCVarsall,
  kcov: setupKcov,
  make: setupMake,
  task: setupTask,
  sevenzip: setupSevenZip,
  "7zip": setupSevenZip,
  "7z": setupSevenZip,
} as const

export type ToolName = keyof typeof setups

/** The tools that can be installed */
export const tools = Object.keys(setups) as Array<ToolName>

/** The possible inputs to the program */
export type Inputs = keyof typeof setups | "compiler" | "architecture" | "timeout"

/** An array of possible inputs */
export const inputs: Array<Inputs> = ["compiler", "architecture", "timeout", ...tools]
