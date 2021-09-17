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
import mri from "mri"

import semverValid from "semver/functions/valid"
import { getVersion } from "./default_versions"
import { setupGcc } from "./gcc/gcc"
import { InstallationInfo } from "./utils/setup/setupBin"

/** The setup functions */
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

/** The tools that can be installed */
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

/** The possible inputs to the program */
type Inputs = keyof typeof setups | "compiler" | "architecture"

// an array of possible inputs
const inputs: Array<Inputs> = ["compiler", "architecture", ...tools]

/** The main entry function */
export async function main(args: string[]): Promise<number> {
  // parse options using mri or github actions
  const opts = mri<Record<Inputs, string | undefined>>(args, {
    string: inputs,
    default: Object.fromEntries(inputs.map((inp) => [inp, maybeGetInput(inp)])),
  })

  // cpu architecture
  const arch = opts.architecture ?? process.arch

  // the installation dir for the tools that are downloaded directly
  const setupCppDir = process.env.SETUP_CPP_DIR ?? "~/setup_cpp"

  // report messages
  const successMessages: string[] = []
  const errorMessages: string[] = []

  // installing the specified compiler
  const maybeCompiler = opts.compiler
  try {
    if (maybeCompiler !== undefined) {
      // detecting the compiler version. Devide the given string by `-` and use the second element as the version
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

      // install the compiler. We allow some aliases for the compiler name
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
          errorMessages.push(`Unsupported compiler ${compiler}`)
        }
      }
    }
  } catch (e) {
    errorMessages.push(`Failed to install the ${maybeCompiler}`)
  }

  // installing the specified tools

  // loop over the tools and run their setup function
  for (const tool of tools) {
    // get the version or "true" or undefined for this tool from the options
    const value = opts[tool]

    // skip if undefined
    if (value !== undefined) {
      // get the setup function
      const setupFunction = setups[tool]

      // runnig the setup function for this tool
      try {
        // eslint-disable-next-line no-await-in-loop
        const installationInfo = await setupFunction(getVersion(tool, value), setupCppDir, arch)

        // preparing a report string
        if (installationInfo !== undefined) {
          successMessages.push(getSuccessMessage(tool, installationInfo))
        } else {
          successMessages.push(`${tool} was successfully installed`)
        }
      } catch (e) {
        // push error message to the logger
        errorMessages.push(`${tool} failed to install`)
      }
    }
  }

  // report the messages in the end
  console.log("\n\n\n")
  successMessages.forEach((tool) => core.info(tool))
  errorMessages.forEach((tool) => core.error(tool))

  core.info("install-cpp finished")
  return errorMessages.length === 0 ? 0 : 1 // exit with non-zero if any error message
}
// Run main
main(process.argv)
  .then((ret) => {
    process.exitCode = ret
  })
  .catch((error) => {
    core.error("main() panicked!")
    core.error(error as string | Error)
    process.exitCode = 1
  })

/** Get an object from github actions */
function maybeGetInput(key: string) {
  const value = core.getInput(key.toLowerCase())
  if (value !== "false" && value !== "") {
    return value
  }
  return undefined // skip installation
}

function getSuccessMessage(tool: string, installationInfo: InstallationInfo) {
  let success = `${tool} was successfully installed`
  if ("installDir" in installationInfo) {
    success += `\nThe installation direcotry is ${installationInfo.installDir}`
  }
  if (installationInfo.binDir !== "") {
    success += `\nThe binary direcotry is ${installationInfo.binDir}`
  }
  return success
}
