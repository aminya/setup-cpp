import { getInput } from "@actions/core"
import { info } from "ci-log"
import type { AddPathOptions } from "envosman"
import mri from "mri"
import { untildifyUser } from "untildify-user"
import { type Inputs, inputs } from "./tool.js"
import type { InstallationInfo } from "./utils/setup/setupBin.js"

export function parseArgs(args: string[]): Opts {
  const defaults = Object.fromEntries(inputs.map((inp) => [inp, maybeGetInput(inp)]))
  return mri<Record<Inputs, string | undefined> & { help: boolean; version: boolean; "setup-cpp": boolean }>(args, {
    string: [...inputs, "timeout", "node-package-manager"],
    default: defaults,
    alias: { h: "help", v: "version" },
    boolean: ["help", "version", "setup-cpp"],
  })
}

export function printHelp() {
  info(`
setup-cpp [options]
setup-cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true

Install all the tools required for building and testing C++/C projects.

--architecture\t the cpu architecture to install the tools for. By default it uses the current CPU architecture.
--timeout\t the timeout for the installation of each tool in minutes. By default it is 10 minutes.
--compiler\t the <compiler> to install.
          \t You can specify the version instead of specifying just the name e.g: --compiler 'llvm-13.0.0'
--tool_name\t pass "true" or pass the <version> you would like to install for this tool. e.g. --conan true or --conan "1.42.1"
--nodePackageManager\t the node package manager to use (npm/yarn/pnpm) when installing setup-cpp globally
--help\t show this help message
--version\t show the version of setup-cpp

All the available tools:
`)

  console.table(
    {
      "compiler and analyzer": {
        tools: "--llvm, --gcc, --msvc, --apple-clang, --vcvarsall",
      },
      "build system": {
        tools: "--cmake, --ninja, --meson, --make, --task, --bazel",
      },
      "package manager": { tools: "--vcpkg, --conan, --choco, --brew, --nala, --git, --setup-cpp" },
      "analyzer/linter": {
        tools:
          "--clang-tidy, --clang-format, --cppcheck, --cpplint, --flawfinder, --lizard, --infer, , --cmakelang, --cmake-lint, --cmake-format",
      },
      cache: { tools: "--ccache, --sccache" },
      documentation: { tools: "--doxygen, --graphviz" },
      coverage: { tools: "--gcovr, --opencppcoverage, --kcov" },
      other: { tools: "--python, --powershell, --sevenzip" },
    },
    ["tools"],
  )
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
    version: boolean
    "setup-cpp"?: boolean
    timeout?: string
    "node-package-manager"?: string
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

export const rcOptions: AddPathOptions = {
  rcPath: untildifyUser("~/.cpprc"),
  guard: "cpp",
}
