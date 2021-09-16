/* eslint-disable require-atomic-updates */
import { execFileSync } from "child_process"
import which from "which"
import { setupBrew } from "../../brew/brew"
import { InstallationInfo } from "./setupBin"

let hasBrew = false

/** A function that installs a package using brew */
export function setupBrewPack(name: string, version?: string): InstallationInfo {
  if (!hasBrew || which.sync("brew", { nothrow: true }) === null) {
    setupBrew("", "", process.arch)
    hasBrew = true
  }

  // brew is not thread-safe
  execFileSync("brew", ["install", version !== undefined && version !== "" ? `${name}@${version}` : name], {
    stdio: "inherit",
  })

  return { binDir: "/usr/local/bin/" }
}
