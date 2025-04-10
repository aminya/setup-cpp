#!/usr/bin/env node
/* eslint-disable node/shebang */

import mri from "mri"
import updateNotifier from "simple-update-notifier"
import packageJson from "../package-version.json"
import { maybeGetInput } from "./actions-input.js"
import { GITHUB_ACTIONS, type Inputs, error, info, inputs, setupCpp, success, warning } from "./lib.ts"
import type { Opts } from "./options.js"
/** The main entry function */
async function main(args: string[]): Promise<number> {
  const checkUpdatePromise = GITHUB_ACTIONS ? Promise.resolve() : checkUpdates()

  // parse options using mri or github actions
  const opts = parseArgs(args)

  // print help
  if (opts.help) {
    printHelp()
    return 0
  }

  // print version
  if (opts.version) {
    info(`${packageJson.version}`)
    return 0
  }

  const { successMessages, errorMessages } = await setupCpp(opts)

  // report the messages in the end
  for (const tool of successMessages) {
    success(tool)
  }
  for (const tool of errorMessages) {
    error(tool)
  }

  if (successMessages.length !== 0 || errorMessages.length !== 0) {
    info("setup-cpp finished")

    if (!GITHUB_ACTIONS) {
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
  }

  await checkUpdatePromise

  return errorMessages.length === 0 ? 0 : 1
}

// auto self update notifier
async function checkUpdates() {
  try {
    await updateNotifier({ pkg: packageJson })
  } catch (err) {
    warning(`Failed to check for updates: ${err instanceof Error ? err.message + err.stack : err}`)
  }
}

/**
 * The options for the setup-cpp function
 */
type CliOpts = Opts & {
  help: boolean
  version: boolean
}

export function parseArgs(args: string[]): CliOpts {
  const defaults = Object.fromEntries(inputs.map((inp) => [inp, maybeGetInput(inp)]))
  return mri<Record<Inputs, string | undefined> & { help: boolean; version: boolean; "setup-cpp": boolean }>(args, {
    string: [...inputs, "timeout", "node-package-manager"],
    default: defaults,
    alias: { h: "help", v: "version" },
    boolean: ["help", "version", "setup-cpp"],
  })
}

function printHelp() {
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
      "package manager": { tools: "--vcpkg, --conan, --choco, --brew, --apt-fast, --nala, --git, --setup-cpp" },
      "analyzer/linter": {
        tools:
          "--clang-tidy, --clang-format, --cppcheck, --cpplint, --flawfinder, --lizard, --infer, , --cmakelang, --cmake-lint, --cmake-format",
      },
      cache: { tools: "--ccache, --sccache" },
      documentation: { tools: "--doxygen, --graphviz" },
      coverage: { tools: "--gcovr, --opencppcoverage, --kcov" },
      other: { tools: "--python, --powershell, --sevenzip, --tar" },
    },
    ["tools"],
  )
}

// Run main
if (process.env.SETUP_CPP_SKIP_MAIN !== "true") {
  main(process.argv)
    .then((ret) => {
      process.exitCode = ret
    })
    .catch((err) => {
      error("main() panicked!")
      error(err as string | Error)
      process.exitCode = 1
    })
}
