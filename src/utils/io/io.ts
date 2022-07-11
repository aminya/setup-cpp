import * as core from "@actions/core"
import { isGitHubCI } from "../env/isCI"

export function error(err: string | Error) {
  return isGitHubCI() ? core.error(err) : console.log(`\x1b[31m${err}\x1b[0m`)
}

export function success(msg: string) {
  return console.log(`\x1b[32m${msg}\x1b[0m`)
}

export function warning(msg: string) {
  return isGitHubCI() ? core.warning(msg) : console.log(`\x1b[33m${msg}\x1b[0m`)
}

export function notice(msg: string) {
  return isGitHubCI() ? core.notice(msg) : console.log(`\x1b[94m${msg}\x1b[0m`)
}

export function info(msg: string) {
  return isGitHubCI() ? core.info(msg) : console.log(msg)
}
