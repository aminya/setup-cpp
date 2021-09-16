import * as core from "@actions/core"
import { setupBrew } from "./brew/brew"
import { setupCcache } from "./ccache/ccache"
import { setupChocolatey } from "./chocolatey/chocolatey"
import { setupCmake } from "./cmake/cmake"
import { setupConan } from "./conan/conan"
import { setupCppcheck } from "./cppcheck/cppcheck"
import { setupDoxygen } from "./doxygen/doxygen"
import { setupGcovr } from "./gcovr/gcovr"
import { setupLLVM } from "./llvm/llvm"
import { setupMeson } from "./meson/meson"
import { setupMSVC } from "./msvc/msvc"
import { setupNinja } from "./ninja/ninja"
import { setupOpencppcoverage } from "./opencppcoverage/opencppcoverage"
import { setupPython } from "./python/python"

import semverValid from "semver/functions/valid"
import { getVersion } from "./default_versions"
import { InstallationInfo } from "./utils/setup/setupBin"
import { setupGcc } from "./gcc/gcc"
import { assert } from "console"

const tools = [
  "cmake",
  "ninja",
  "python",
  "conan",
  "meson",
  "gcovr",
  "opencppcoverage",
  "llvm",
  "gcc",
  "choco",
  "brew",
  "ccache",
  "doxygen",
  "cppcheck",
  "msvc",
]

const setups = {
  cmake: setupCmake,
  ninja: setupNinja,
  python: setupPython,
  conan: setupConan,
  meson: setupMeson,
  gcovr: setupGcovr,
  opencppcoverage: setupOpencppcoverage,
  llvm: setupLLVM,
  gcc: setupGcc,
  choco: setupChocolatey,
  brew: setupBrew,
  ccache: setupCcache,
  doxygen: setupDoxygen,
  cppcheck: setupCppcheck,
  msvc: setupMSVC,
} as Record<
  string,
  (
    version: string | undefined,
    setupCppDir: string,
    ...args: unknown[]
  ) => Promise<InstallationInfo> | Promise<void> | void
>

function maybeGetInput(key: string) {
  const value = core.getInput(key.toLowerCase())
  if (value !== "false" && value !== "") {
    return value
  }
  return undefined // skip installation
}

export async function main(): Promise<number> {
  const arch = core.getInput("architecture") || process.arch
  const setupCppDir = process.env.SETUP_CPP_DIR ?? "~/setup_cpp"
  try {
    const maybeCompiler = maybeGetInput("compiler")
    if (maybeCompiler !== undefined) {
      const compilerAndMaybeVersion = maybeCompiler.split("-")
      const compiler = compilerAndMaybeVersion[0]
      let version: string | undefined
      if (1 in compilerAndMaybeVersion) {
        const maybeVersion = compilerAndMaybeVersion[1]
        if (semverValid(maybeVersion) !== null) {
          version = maybeVersion
        } else {
          core.error(`Invalid version ${maybeVersion} used for the compiler. Using the default version...`)
        }
      }

      switch (compiler) {
        case "llvm":
        case "clang":
        case "clang++": {
          await setupLLVM(getVersion("llvm", version) as string, setupCppDir, arch)
          break
        }
        case "gcc":
        case "mingw":
        case "cygwin":
        case "msys": {
          await setupGcc(getVersion("gcc", version) as string, setupCppDir, arch)
          break
        }
        case "cl":
        case "msvc":
        case "msbuild":
        case "vs":
        case "visualstudio":
        case "visualcpp":
        case "visualc++": {
          await setupMSVC(getVersion("msvc", version) as string, setupCppDir, arch)
          break
        }
        default: {
          core.error(`Unsupported compiler ${compiler}`)
        }
      }
    }

    for (const tool of tools) {
      assert(tool in setups)
      const version = maybeGetInput(tool)
      if (version !== undefined) {
        const setupFunction = setups[tool]
        // eslint-disable-next-line no-await-in-loop
        await setupFunction(getVersion(tool, version), setupCppDir, arch)
      }
    }
  } catch (err) {
    core.error(err as string | Error)
    core.setFailed("install-cpp failed")
    return 1
  }

  core.info("install-cpp succeeded")
  return 0
}

main()
  .then((ret) => {
    process.exitCode = ret
  })
  .catch((error) => {
    core.error("main() failed!")
    core.error(error as string | Error)
    process.exitCode = 1
  })
