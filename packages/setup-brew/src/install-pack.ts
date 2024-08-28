import { join } from "path"
import { info } from "ci-log"
/* eslint-disable require-atomic-updates */
import { execaSync } from "execa"
import which from "which"
import type { InstallationInfo } from "./InstallationInfo.js"
import { getBrewBinDir, setupBrew } from "./install.js"

let hasBrew = false

export type BrewPackOptions = {
  /** Whether to overwrite the package if it already exists */
  overwrite?: boolean
  /** Whether to install the package as a cask */
  cask?: boolean
  /** Extra args */
  args?: string[]
}

/** A function that installs a package using brew
 *
 * @param name The name of the package
 * @param version The version of the package (optional)
 * @param options The options for installing the package
 *
 * @returns The installation information
 */
export async function installBrewPack(
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
    await setupBrew()
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
