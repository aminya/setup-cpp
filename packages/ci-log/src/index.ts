import * as core from "@actions/core"
import ciInfo from "ci-info"
const { GITHUB_ACTIONS } = ciInfo

export function error(err: string | Error) {
  return GITHUB_ACTIONS ? core.error(err) : console.log(`\x1b[31m${err}\x1b[0m`)
}

export function success(msg: string) {
  return console.log(`\x1b[32m${msg}\x1b[0m`)
}

export function warning(msg: string) {
  return GITHUB_ACTIONS ? core.warning(msg) : console.log(`\x1b[33m${msg}\x1b[0m`)
}

export function notice(msg: string) {
  return GITHUB_ACTIONS ? core.notice(msg) : console.log(`\x1b[94m${msg}\x1b[0m`)
}

export function info(msg: string) {
  return GITHUB_ACTIONS ? core.info(msg) : console.log(msg)
}
