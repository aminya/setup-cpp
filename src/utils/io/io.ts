import * as core from "@actions/core"
import { isGitHubCI } from "../env/isci"

export function error(err: string | Error) {
  return isGitHubCI() ? core.error(err) : console.log(`\x1b[31m${err}\x1b[0m`)
}

export function success(msg: string) {
  return isGitHubCI() ? core.info(msg) : console.log(`\x1b[32m${msg}\x1b[0m`)
}
