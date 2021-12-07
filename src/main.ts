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
import { isCI } from "./utils/env/isci"

import semverValid from "semver/functions/valid"
import { getVersion } from "./default_versions"
import { setupGcc } from "./gcc/gcc"
import { InstallationInfo } from "./utils/setup/setupBin"
import { error, success } from "./utils/io/io"
import { setupVcpkg } from "./vcpkg/vcpkg"
import { join } from "path"
import { warning } from "@actions/core"
import { setupVCVarsall } from "./vcvarsall/vcvarsall"

/** The setup functions */
const setups = {
  cmake: setupCmake,
  ninja: setupNinja,
  python: setupPython,
  vcpkg: setupVcpkg,
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
  vcvarsall: setupVCVarsall,
}

/** The tools that can be installed */
const tools: Array<keyof typeof setups> = [
  "choco",
  "brew",
  "python",
  "vcpkg",
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
  "vcvarsall",
]

/** The possible inputs to the program */
type Inputs = keyof typeof setups | "compiler" | "architecture"

// an array of possible inputs
const inputs: Array<Inputs> = ["compiler", "architecture", ...tools]

/** The main entry function */
export async function main(args: string[]): Promise<number> {
  if (!isCI()) {
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
  const setupCppDir = process.env.SETUP_CPP_DIR ?? untildify("~/")

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
      // running the setup function for this tool
      try {
        let installationInfo: InstallationInfo | undefined | void
        if (tool === "vcvarsall") {
          // eslint-disable-next-line no-await-in-loop
          setupVCVarsall(getVersion(tool, value), undefined, arch, undefined, undefined, false, false)
        } else {
          // get the setup function
          const setupFunction = setups[tool]

          // eslint-disable-next-line no-await-in-loop
          installationInfo = await setupFunction(getVersion(tool, value), join(setupCppDir, tool), arch)
        }
        // preparing a report string
        if (installationInfo !== undefined) {
          successMessages.push(getSuccessMessage(tool, installationInfo))
        } else {
          successMessages.push(`${tool} was successfully installed`)
        }
      } catch (e) {
        // push error message to the logger
        error(e as string | Error)
        errorMessages.push(`${tool} failed to install`)
      }
    }
  }

  // installing the specified compiler
  const maybeCompiler = opts.compiler
  try {
    if (maybeCompiler !== undefined) {
      const { compiler, version } = getCompilerInfo(maybeCompiler)

      // install the compiler. We allow some aliases for the compiler name
      switch (compiler) {
        case "llvm":
        case "clang":
        case "clang++": {
          await setupLLVM(getVersion("llvm", version) as string, join(setupCppDir, "llvm"), arch)
          break
        }
        case "gcc":
        case "mingw":
        case "cygwin":
        case "msys": {
          await setupGcc(getVersion("gcc", version) as string, join(setupCppDir, "gcc"), arch)
          break
        }
        case "cl":
        case "msvc":
        case "msbuild":
        case "vs":
        case "visualstudio":
        case "visualcpp":
        case "visualc++": {
          await setupMSVC(getVersion("msvc", version) as string, join(setupCppDir, "msvc"), arch)
          break
        }
        case "appleclang":
        case "applellvm": {
          core.warning("Assuming apple-clang is already installed")
          core.exportVariable("CC", "clang")
          core.exportVariable("CXX", "clang++")
          break
        }
        default: {
          errorMessages.push(`Unsupported compiler ${compiler}`)
        }
      }
    }
  } catch (e) {
    error(e as string | Error)
    errorMessages.push(`Failed to install the ${maybeCompiler}`)
  }

  // report the messages in the end
  successMessages.forEach((tool) => success(tool))
  errorMessages.forEach((tool) => error(tool))

  core.info("setup_cpp finished")

  if (!isCI()) {
    switch (process.platform) {
      case "win32": {
        core.info("Run `RefreshEnv.cmd` or restart your shell to update the environment.")
        break
      }
      case "linux":
      case "darwin": {
        core.info("Run `source ~/.profile` or restart your shell to update the environment.")
        break
      }
      default: {
        // nothing
      }
    }
  }

  return errorMessages.length === 0 ? 0 : 1 // exit with non-zero if any error message
}
// Run main
main(process.argv)
  .then((ret) => {
    process.exitCode = ret
  })
  .catch((err) => {
    error("main() panicked!")
    error(err as string | Error)
    process.exitCode = 1
  })

/** Detecting the compiler version. Divide the given string by `-` and use the second element as the version */
export function getCompilerInfo(maybeCompiler: string) {
  const compilerAndMaybeVersion = maybeCompiler.split("-")
  const compiler = compilerAndMaybeVersion[0]
  if (1 in compilerAndMaybeVersion) {
    const maybeVersion = compilerAndMaybeVersion[1]
    if (semverValid(maybeVersion) !== null) {
      return { compiler, version: maybeVersion }
    } else {
      warning(`Invalid semver version ${maybeVersion} used for the compiler.`)
      return { compiler, version: maybeVersion }
    }
  }
  return { compiler, version: undefined }
}

function printHelp() {
  core.info(`
setup_cpp [options]
setup_cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true

Install all the tools required for building and testing C++/C projects.

--architecture\t the cpu architecture to install the tools for. By default it uses the current CPU architecture.
--compiler\t the <compiler> to install.
          \t You can specify the version instead of specifying just the name e.g: --compiler 'llvm-13.0.0'

--tool_name\t pass "true" or pass the <version> you would like to install for this tool. e.g. --conan true or --conan "1.42.1"

All the available tools:
--llvm
--gcc
--vcvarsall
--cmake
--ninja
--vcpkg
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
  let msg = `${tool} was successfully installed`
  if ("installDir" in installationInfo) {
    msg += `\nThe installation directory is ${installationInfo.installDir}`
  }
  if (installationInfo.binDir !== "") {
    msg += `\nThe binary directory is ${installationInfo.binDir}`
  }
  return msg
}
