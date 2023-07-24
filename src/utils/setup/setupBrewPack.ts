/* eslint-disable require-atomic-updates */
import { info } from "@actions/core"
import { execaSync } from "execa"
import { join } from "patha"
import which from "which"
import { getBrewPath, setupBrew } from "../../brew/brew"
import { InstallationInfo } from "./setupBin"

let hasBrew = false

/** A function that installs a package using brew */
export async function setupBrewPack(
  name: string,
  version?: string,
  extraArgs: string[] = [],
): Promise<InstallationInfo> {
  info(`Installing ${name} ${version ?? ""} via brew`)

  if (!hasBrew || which.sync("brew", { nothrow: true }) === null) {
    await setupBrew("", "", process.arch)
    hasBrew = true
  }

  const binDir = getBrewPath()

  // brew is not thread-safe
  execaSync(
    join(binDir, "brew"),
    ["install", version !== undefined && version !== "" ? `${name}@${version}` : name, ...extraArgs],
    {
      stdio: "inherit",
    },
  )

  return { binDir }
}
