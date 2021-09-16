/* eslint-disable require-atomic-updates */
import { exec } from "@actions/exec"
import which from "which"
import { setupBrew } from "../../brew/brew"

let hasBrew = false

/** A function that installs a package using brew */
export async function setupBrewPack(name: string, version?: string) {
  if (!hasBrew || which.sync("brew", { nothrow: true }) === null) {
    await setupBrew()
    hasBrew = true
  }

  const exit = await exec("brew", ["install", version !== undefined ? `${name}@${version}` : name])

  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }
}
