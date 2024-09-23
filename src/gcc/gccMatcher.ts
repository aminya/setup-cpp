import { join } from "path"
import { info, warning } from "ci-log"
import { pathExists } from "path-exists"
import { dirname } from "./gcc.ts"

export async function addGccLoggingMatcher() {
  const matcherPath = join(dirname, "gcc_matcher.json")
  if (!(await pathExists(matcherPath))) {
    return warning("the gcc_matcher.json file does not exist in the same folder as setup-cpp.js")
  }
  info(`::add-matcher::${matcherPath}`)
}
