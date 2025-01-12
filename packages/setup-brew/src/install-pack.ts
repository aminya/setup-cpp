import { join } from "path"
import { info } from "ci-log"
import { execaSync } from "execa"
import which from "which"
import type { InstallationInfo } from "./InstallationInfo.js"
import type { BrewPackOptions } from "./install-pack-options.js"
import { getBrewBinDir, setupBrew } from "./install.js"

/* eslint-disable require-atomic-updates */
let hasBrew = false

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
  options: BrewPackOptions = {},
): Promise<InstallationInfo> {
  if (!("overwrite" in options)) {
    options.overwrite = true // default to true if not specified
  }
  if (options.cask === true) {
    options.overwrite = false // mutually exclusive with --overwrite
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
  // Add options to args
  for (const [key, value] of Object.entries(options)) {
    if (typeof value === "boolean" && value) {
      args.push(`--${key}`)
    } else if (typeof value === "string") {
      args.push(`--${key}`, value)
    }
  }

  // brew is not thread-safe
  execaSync(brewPath, args, { stdio: "inherit" })

  return { binDir }
}
