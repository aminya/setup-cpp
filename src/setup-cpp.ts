#!/usr/bin/env node
/* eslint-disable node/shebang */

import { GITHUB_ACTIONS } from "ci-info"
import { error, info } from "ci-log"
import packageJson from "../package-version.json"
import { checkUpdates } from "./check-updates.ts"
import { parseArgs, printHelp } from "./cli-options.ts"
import { setupCpp } from "./lib.ts"

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

  await Promise.all([checkUpdatePromise, setupCpp(opts)])

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
