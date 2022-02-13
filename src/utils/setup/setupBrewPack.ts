/* eslint-disable require-atomic-updates */
import { endGroup, startGroup } from "@actions/core"
import execa from "execa"
import which from "which"
import { setupBrew } from "../../brew/brew"
import { InstallationInfo } from "./setupBin"

let hasBrew = false

/** A function that installs a package using brew */
export function setupBrewPack(name: string, version?: string): InstallationInfo {
  startGroup(`Installing ${name} ${version ?? ""} via brew`)

  if (!hasBrew || which.sync("brew", { nothrow: true }) === null) {
    setupBrew("", "", process.arch)
    hasBrew = true
  }

  // brew is not thread-safe
  execa.sync("brew", ["install", version !== undefined && version !== "" ? `${name}@${version}` : name], {
    stdio: "inherit",
  })

  endGroup()
  return { binDir: "/usr/local/bin/" }
}
