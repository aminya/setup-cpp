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
import untildify from "untildify"

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
  "choco",
  "brew",
  "python",
  "cmake",
  "ninja",
  "conan",
  "meson",
  "gcovr",
  "opencppcoverage",
  "ccache",
  "doxygen",
  "cppcheck",
  "llvm",
  "gcc",
  "msvc",
]

/** The possible inputs to the program */
type Inputs = keyof typeof setups | "compiler" | "architecture"

// an array of possible inputs
const inputs: Array<Inputs> = ["compiler", "architecture", ...tools]

/** The main entry function */
export async function main(args: string[]): Promise<number> {
  const isCI = process.env.CI === undefined || process.env.CI === "" || process.env.CI === "false"

  if (!isCI) {
    process.env.ACTIONS_ALLOW_UNSECURE_COMMANDS = "true"
  }

  // parse options using mri or github actions
  const opts = mri<Record<Inputs, string | undefined> & { help: boolean }>(args, {
    string: inputs,
    default: Object.fromEntries(inputs.map((inp) => [inp, maybeGetInput(inp)])),
    alias: { h: "help" },
    boolean: "help",
  })

  // print help
  if (opts.help) {
    printHelp()
  }

  // cpu architecture
  const arch = opts.architecture ?? process.arch

  // the installation dir for the tools that are downloaded directly
  const setupCppDir = process.env.SETUP_CPP_DIR ?? untildify("~/setup_cpp")

  // report messages
  const successMessages: string[] = []
  const errorMessages: string[] = []

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

  // report the messages in the end
  successMessages.forEach((tool) => (isCI ? core.info(tool) : console.log(`\x1b[32m${tool}\x1b[0m`)))
  errorMessages.forEach((tool) => (isCI ? core.error(tool) : console.log(`\x1b[31m${tool}\x1b[0m`)))

  core.info("setup_cpp finished")
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

function printHelp() {
  core.info(`
setup_cpp [options]
setup_cpp --compiler llvm --cmake true --ninja true --ccache true --conan "1.40.1"

Install all the tools required for building and testing C++/C projects.

--architecture\t the cpu architecture to install the tools for. By default it uses the current CPU architecture.
--compiler\t the <compiler> to install.
          \t You can specify the version instead of specifying just the name e.g: --compiler 'llvm-11'

--tool_name\t pass "true" or pass the <version> you would like to install for this tool.

All the available tools:
--llvm
--gcc
--cmake
--ninja
--meson
--conan
--ccache
--cppcheck
--doxygen
--gcovr
--opencppcoverage
--python
--choco
--brew
      `)
}

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
