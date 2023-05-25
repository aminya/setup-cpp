import { getInput } from "@actions/core"
import { info } from "ci-log"
import mri from "mri"
import { InstallationInfo } from "./utils/setup/setupBin"
import { Inputs, inputs } from "./tool"

export function parseArgs(args: string[]): Opts {
  return mri<Record<Inputs, string | undefined> & { help: boolean }>(args, {
    string: inputs,
    default: Object.fromEntries(inputs.map((inp) => [inp, maybeGetInput(inp)])),
    alias: { h: "help" },
    boolean: "help",
  })
}

export function printHelp() {
  info(`
setup-cpp [options]
setup-cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true

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
--sccache
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
--powershell
      `)
}
/** Get an object from github actions */

export function maybeGetInput(key: string) {
  const value = getInput(key.toLowerCase())
  if (value !== "false" && value !== "") {
    return value
  }
  return undefined // skip installation
}
export type Opts = mri.Argv<
  Record<Inputs, string | undefined> & {
    help: boolean
  }
>

export function getSuccessMessage(tool: string, installationInfo: InstallationInfo | undefined | void) {
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
