import * as core from "@actions/core"

const isCI = process.env.CI === undefined || process.env.CI === "" || process.env.CI === "false"

export function error(err: string | Error) {
  return isCI ? core.error(err) : console.log(`\x1b[31m${err}\x1b[0m`)
}

export function success(msg: string) {
  return isCI ? core.info(msg) : console.log(`\x1b[32m${msg}\x1b[0m`)
}
