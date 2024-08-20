/* eslint-disable require-atomic-updates */
import { info } from "@actions/core"
import { execaSync } from "execa"
import { join } from "patha"
import which from "which"
import { getBrewBinDir, setupBrew } from "../../brew/brew.js"
import type { InstallationInfo } from "./setupBin.js"

let hasBrew = false

type BrewPackOptions = {
  /** Whether to overwrite the package if it already exists */
  overwrite?: boolean
  /** Whether to install the package as a cask */
  cask?: boolean
  /** Extra args */
  args?: string[]
}

/** A function that installs a package using brew */
export async function setupBrewPack(
  name: string,
  version?: string,
  givenOptions: BrewPackOptions = {},
): Promise<InstallationInfo> {
  const options = {
    overwrite: true,
    cask: false,
    args: [],
    ...givenOptions,
  }

  info(`Installing ${name} ${version ?? ""} via brew`)

  if (!hasBrew || which.sync("brew", { nothrow: true }) === null) {
    await setupBrew("", "", process.arch)
    hasBrew = true
  }

  const binDir = getBrewBinDir()
  const brewPath = join(binDir, "brew")

  // Args
  const args = [
    "install",
    (version !== undefined && version !== "") ? `${name}@${version}` : name,
  ]
  if (options.overwrite) {
    args.push("--overwrite")
  }
  if (options.cask) {
    args.push("--cask")
  }

  // brew is not thread-safe
  execaSync(brewPath, args, { stdio: "inherit" })

  return { binDir }
}
