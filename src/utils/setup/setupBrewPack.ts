/* eslint-disable require-atomic-updates */
import { execFileSync } from "child_process"
import which from "which"
import { setupBrew } from "../../brew/brew"

let hasBrew = false

/** A function that installs a package using brew */
export async function setupBrewPack(name: string, version?: string) {
  if (!hasBrew || which.sync("brew", { nothrow: true }) === null) {
    await setupBrew()
    hasBrew = true
  }

  // brew is not thread-safe
  execFileSync("brew", ["install", version !== undefined ? `${name}@${version}` : name], { stdio: "inherit" })
}
