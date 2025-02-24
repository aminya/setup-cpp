#!/usr/bin/env node
/* eslint-disable node/shebang */

import { GITHUB_ACTIONS, isCI } from "ci-info"
import { error, info, success, warning } from "ci-log"
import { finalizeRC } from "envosman"
import numerous from "numerous"
import numerousLocale from "numerous/locales/en.js"
import timeDelta from "time-delta"
import timeDeltaLocale from "time-delta/locales/en.js"
import { untildifyUser } from "untildify-user"
import { checkUpdates } from "./check-updates.js"
import { parseArgs, printHelp, rcOptions } from "./cli-options.js"
import { getCompilerInfo, installCompiler } from "./compilers.js"
import { installTool } from "./installTool.js"
import { type Inputs, llvmTools, tools } from "./tool.js"
import { isArch } from "./utils/env/isArch.js"
import { ubuntuVersion } from "./utils/env/ubuntu_version.js"
import { setupPacmanPack } from "./utils/setup/setupPacmanPack.js"
import { syncVersions } from "./versions/versions.js"

/** The main entry function */
async function main(args: string[]): Promise<number> {
  let checkUpdatePromise = Promise.resolve()
  if (!GITHUB_ACTIONS) {
    checkUpdatePromise = checkUpdates()
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
  const setupCppDir = process.env.SETUP_CPP_DIR ?? untildifyUser("~")

  // report messages
  const successMessages: string[] = []
  const errorMessages: string[] = []

  const timeFormatter = timeDelta.create({ autoloadLocales: true })
  timeDelta.addLocale(timeDeltaLocale as timeDelta.Locale)
  numerous.addLocale(numerousLocale as numerous.Locale)
  let time1: number
  let time2: number

  // installing the specified tools

  const osVersion = await ubuntuVersion()

  const compilerInfo = opts.compiler !== undefined ? getCompilerInfo(opts.compiler) : undefined

  // sync the version for the llvm tools
  if (!syncVersions(opts, [...llvmTools, "compiler"] as Inputs[], compilerInfo)) {
    error("The same version must be used for llvm, clang-format and clang-tidy")
    return 1
  }

  if (isArch() && typeof opts.cppcheck === "string" && typeof opts.gcovr === "string") {
    info("installing python-pygments to avoid conflicts with cppcheck and gcovr on Arch linux")
    await setupPacmanPack("python-pygments")
  }

  // loop over the tools and run their setup function

  let failedFast = false
  for (const tool of tools) {
    // fail fast inside CI when any tool fails
    if (isCI && errorMessages.length !== 0) {
      failedFast = true
      break
    }

    // get the version or "true" or undefined for this tool from the options
    const version = opts[tool]

    // skip if undefined
    if (version !== undefined) {
      const timeout = opts.timeout !== undefined ? Number.parseFloat(opts.timeout) * 60 * 1000 : undefined
      // running the setup function for this tool
      time1 = Date.now()

      // eslint-disable-next-line no-await-in-loop
      await installTool(
        tool,
        version,
        osVersion,
        arch,
        setupCppDir,
        successMessages,
        errorMessages,
        timeout,
      )
      time2 = Date.now()
      info(`took ${timeFormatter.format(time1, time2) || "0 seconds"}`)
    }
  }

  if (!failedFast && compilerInfo !== undefined) {
    // install the specified compiler
    const time1Compiler = Date.now()
    await installCompiler(
      compilerInfo.compiler,
      compilerInfo.version,
      osVersion,
      setupCppDir,
      arch,
      successMessages,
      errorMessages,
    )
    const time2Compiler = Date.now()
    info(`took ${timeFormatter.format(time1Compiler, time2Compiler) || "0 seconds"}`)
  }

  await finalizeRC(rcOptions)

  if (successMessages.length === 0 && errorMessages.length === 0) {
    warning("setup-cpp was called without any arguments. Nothing to do.")
    return 0
  }

  // report the messages in the end
  for (const tool of successMessages) {
    success(tool)
  }
  for (const tool of errorMessages) {
    error(tool)
  }

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

  await checkUpdatePromise

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
