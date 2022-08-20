import { getInput, endGroup, startGroup, notice } from "@actions/core"
import { setupBrew } from "./brew/brew"
import { setupCcache } from "./ccache/ccache"
import { setupMake } from "./make/make"
import { setupTask } from "./task/task"
import { setupChocolatey } from "./chocolatey/chocolatey"
import { setupCmake } from "./cmake/cmake"
import { setupConan } from "./conan/conan"
import { setupCppcheck } from "./cppcheck/cppcheck"
import { setupDoxygen } from "./doxygen/doxygen"
import { setupGcovr } from "./gcovr/gcovr"
import { setupLLVM, setupClangTools } from "./llvm/llvm"
import { setupMeson } from "./meson/meson"
import { setupMSVC } from "./msvc/msvc"
import { setupNinja } from "./ninja/ninja"
import { setupOpencppcoverage } from "./opencppcoverage/opencppcoverage"
import { setupPython } from "./python/python"
import mri from "mri"
import { untildifyUser } from "untildify-user"
import ciDetect from "@npmcli/ci-detect"
import * as timeDelta from "time-delta"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import timeDeltaLocale from "time-delta/locales/en.js"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as numerous from "numerous"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import numerousLocale from "numerous/locales/en.js"
import { ubuntuVersion } from "./utils/env/ubuntu_version"

import semverValid from "semver/functions/valid"
import { getVersion, syncVersions } from "./default_versions"
import { setupGcc } from "./gcc/gcc"
import { InstallationInfo } from "./utils/setup/setupBin"
import { error, info, success, warning } from "ci-log"
import { setupVcpkg } from "./vcpkg/vcpkg"
import { join } from "patha"
import { setupVCVarsall } from "./vcvarsall/vcvarsall"
import { setupKcov } from "./kcov/kcov"
import { addEnv } from "./utils/env/addEnv"
import { setupSevenZip } from "./sevenzip/sevenzip"
import { setupGraphviz } from "./graphviz/graphviz"
import { setupNala } from "./nala/nala"
import { setupBazel } from "./bazel/bazel"
import { setupPowershell } from "./powershell/powershell"

/** The setup functions */
const setups = {
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

/** The tools that can be installed */
const tools: Array<keyof typeof setups> = [
  "nala",
  "choco",
  "brew",
  "python",
  "powershell",
  "vcpkg",
  "bazel",
  "cmake",
  "ninja",
  "conan",
  "meson",
  "gcovr",
  "opencppcoverage",
  "ccache",
  "doxygen",
  "graphviz",
  "cppcheck",
  "clangtidy",
  "clangformat",
  "llvm",
  "gcc",
  "msvc",
  "vcvarsall",
  "kcov",
  "make",
  "task",
  "sevenzip",
]

/** The possible inputs to the program */
export type Inputs = keyof typeof setups | "compiler" | "architecture"

// an array of possible inputs
const inputs: Array<Inputs> = ["compiler", "architecture", ...tools]

/** The main entry function */
export async function main(args: string[]): Promise<number> {
  if (ciDetect() !== "github-actions") {
    process.env.ACTIONS_ALLOW_UNSECURE_COMMANDS = "true"
  }

  // parse options using mri or github actions
  const opts = parseArgs(args)

  // print help
  if (opts.help) {
    printHelp()
  }

  // cpu architecture
  const arch = opts.architecture ?? process.arch

  // the installation dir for the tools that are downloaded directly
  const setupCppDir = process.env.SETUP_CPP_DIR ?? untildifyUser("")

  // report messages
  const successMessages: string[] = []
  const errorMessages: string[] = []

  const timeFormatter = timeDelta.create({ autoloadLocales: true })
  timeDelta.addLocale(timeDeltaLocale as timeDelta.Locale)
  numerous.addLocale(numerousLocale)
  let time1: number
  let time2: number

  // installing the specified tools

  let osVersion: number[] | null = null
  try {
    // get the version if not already done
    osVersion = await ubuntuVersion()
  } catch (err) {
    warning((err as Error).toString())
  }

  // sync the version for the llvm tools
  if (!syncVersions(opts, ["llvm", "clangtidy", "clangformat"])) {
    error("The same version must be used for llvm, clangformat and clangtidy")
    return 1
  }

  // loop over the tools and run their setup function
  for (const tool of tools) {
    // get the version or "true" or undefined for this tool from the options
    const version = opts[tool]

    // skip if undefined
    if (version !== undefined) {
      // running the setup function for this tool
      time1 = Date.now()
      startGroup(`Installing ${tool} ${version}`)
      try {
        let installationInfo: InstallationInfo | undefined | void
        if (tool === "vcvarsall") {
          // eslint-disable-next-line no-await-in-loop
          await setupVCVarsall(
            getVersion(tool, version, osVersion),
            undefined,
            arch,
            undefined,
            undefined,
            false,
            false
          )
        } else {
          // get the setup function
          const setupFunction = setups[tool]

          // the tool installation directory (for the functions that ue it)
          const setupDir = join(setupCppDir, ["llvm", "clangformat", "clangtidy"].includes(tool) ? "llvm" : tool)

          // eslint-disable-next-line no-await-in-loop
          installationInfo = await setupFunction(getVersion(tool, version, osVersion), setupDir, arch)
        }
        // preparing a report string
        successMessages.push(getSuccessMessage(tool, installationInfo))
      } catch (e) {
        // push error message to the logger
        error(e as string | Error)
        errorMessages.push(`${tool} failed to install`)
      }
      endGroup()
      time2 = Date.now()
      info(`took ${timeFormatter.format(time1, time2) || "0 seconds"}`)
    }
  }

  // installing the specified compiler
  const maybeCompiler = opts.compiler
  time1 = Date.now()
  try {
    if (maybeCompiler !== undefined) {
      const { compiler, version } = getCompilerInfo(maybeCompiler)

      // install the compiler. We allow some aliases for the compiler name
      startGroup(`Installing ${compiler} ${version ?? ""}`)
      switch (compiler) {
        case "llvm":
        case "clang":
        case "clang++": {
          const installationInfo = await setupLLVM(
            getVersion("llvm", version, osVersion),
            join(setupCppDir, "llvm"),
            arch
          )
          successMessages.push(getSuccessMessage("llvm", installationInfo))
          break
        }
        case "gcc":
        case "mingw":
        case "cygwin":
        case "msys": {
          const installationInfo = await setupGcc(getVersion("gcc", version, osVersion), join(setupCppDir, "gcc"), arch)
          successMessages.push(getSuccessMessage("gcc", installationInfo))
          break
        }
        case "cl":
        case "msvc":
        case "msbuild":
        case "vs":
        case "visualstudio":
        case "visualcpp":
        case "visualc++": {
          const installationInfo = await setupMSVC(
            getVersion("msvc", version, osVersion),
            join(setupCppDir, "msvc"),
            arch
          )
          successMessages.push(getSuccessMessage("msvc", installationInfo))
          break
        }
        case "appleclang":
        case "applellvm": {
          notice("Assuming apple-clang is already installed")
          await Promise.all([addEnv("CC", "clang"), addEnv("CXX", "clang++")])
          successMessages.push(getSuccessMessage("apple-clang", undefined))
          break
        }
        default: {
          errorMessages.push(`Unsupported compiler ${compiler}`)
        }
      }
      endGroup()
      time2 = Date.now()
      info(`took ${timeFormatter.format(time1, time2) || "0 seconds"}`)
    }
  } catch (e) {
    error(e as string | Error)
    errorMessages.push(`Failed to install the ${maybeCompiler}`)
    endGroup()
    time2 = Date.now()
    info(`took ${timeFormatter.format(time1, time2) || "0 seconds"}`)
  }

  if (successMessages.length === 0 && errorMessages.length === 0) {
    warning("setup_cpp was called without any arguments. Nothing to do.")
    return 0
  }

  // report the messages in the end
  successMessages.forEach((tool) => success(tool))
  errorMessages.forEach((tool) => error(tool))

  info("setup_cpp finished")

  if (ciDetect() !== "github-actions") {
    switch (process.platform) {
      case "win32": {
        warning("Run `RefreshEnv.cmd` or restart your shell to update the environment.")
        break
      }
      case "linux":
      case "darwin": {
        warning("Run `source ~/.cpprc` or restart your shell to update the environment.")
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

export type Opts = mri.Argv<
  Record<Inputs, string | undefined> & {
    help: boolean
  }
>

export function parseArgs(args: string[]): Opts {
  return mri<Record<Inputs, string | undefined> & { help: boolean }>(args, {
    string: inputs,
    default: Object.fromEntries(inputs.map((inp) => [inp, maybeGetInput(inp)])),
    alias: { h: "help" },
    boolean: "help",
  })
}

/** Detecting the compiler version. Divide the given string by `-` and use the second element as the version */
export function getCompilerInfo(maybeCompiler: string) {
  const compilerAndMaybeVersion = maybeCompiler.split("-")
  const compiler = compilerAndMaybeVersion[0]
  if (1 in compilerAndMaybeVersion) {
    const maybeVersion = compilerAndMaybeVersion[1]
    if (semverValid(maybeVersion) !== null) {
      return { compiler, version: maybeVersion }
    } else {
      info(`Invalid semver version ${maybeVersion} used for the compiler.`)
      return { compiler, version: maybeVersion }
    }
  }
  return { compiler, version: undefined }
}

function printHelp() {
  info(`
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
--bazel
--meson
--conan
--make
--task
--ccache
--cppcheck
--clangformat
--clangtidy
--doxygen
--gcovr
--opencppcoverage
--kcov

--python
--choco
--brew
--nala
--sevenzip
--graphviz
      `)
}

/** Get an object from github actions */
function maybeGetInput(key: string) {
  const value = getInput(key.toLowerCase())
  if (value !== "false" && value !== "") {
    return value
  }
  return undefined // skip installation
}

function getSuccessMessage(tool: string, installationInfo: InstallationInfo | undefined | void) {
  let msg = `✅ ${tool} was installed successfully:`
  if (installationInfo === undefined) {
    return msg
  }
  if ("installDir" in installationInfo) {
    msg += `\n- The installation directory is ${installationInfo.installDir}`
  }
  if (installationInfo.binDir !== "") {
    msg += `\n- The binary directory is ${installationInfo.binDir}`
  }
  return msg
}
