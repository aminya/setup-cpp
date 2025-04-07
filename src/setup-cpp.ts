#!/usr/bin/env node
/* eslint-disable node/shebang */

import { checkUpdates } from "./check-updates.ts"
import { parseArgs, printHelp } from "./cli-options.ts"
import { GITHUB_ACTIONS, error, info, packageJson, setupCpp, success, warning } from "./lib.ts"

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

  return 0
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
