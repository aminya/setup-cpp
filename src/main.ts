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
import { setupGcc } from "./gcc/gcc"

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
}

const tools: Array<keyof typeof setups> = [
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

type Inputs = "compiler" | keyof typeof setups

function maybeGetInput(key: Inputs) {
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

    const toolsSucceeded: string[] = []
    const toolsErrored: string[] = []
    for (const tool of tools) {
      const version = maybeGetInput(tool)
      if (version !== undefined) {
        const setupFunction = setups[tool]

        try {
          // eslint-disable-next-line no-await-in-loop
          const installationInfo = await setupFunction(getVersion(tool, version), setupCppDir, arch)
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (installationInfo !== undefined) {
            let success = `${tool} was successfully installed`
            if ("installDir" in installationInfo) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore typescript is confused about the existence of installDir
              success += `\nThe installation direcotry is ${installationInfo.installDir}`
            }
            if (installationInfo.binDir !== "") {
              success += `\nThe binary direcotry is ${installationInfo.binDir}`
            }
            toolsSucceeded.push(success)
          } else {
            toolsSucceeded.push(`${tool} was successfully installed`)
          }
        } catch (e) {
          toolsErrored.push(`${tool} failed to install`)
        }
      }
    }

    console.log("\n\n\n")
    toolsSucceeded.forEach((tool) => core.info(tool))
    toolsErrored.forEach((tool) => core.error(tool))
  } catch (err) {
    core.error(err as string | Error)
    core.setFailed("install-cpp failed")
    return 1
  }

  core.info("install-cpp finished")
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
