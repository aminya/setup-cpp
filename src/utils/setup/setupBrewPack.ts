/* eslint-disable require-atomic-updates */
import { exec } from "@actions/exec"

/** A function that installs a package using brew */
export async function setupBrewPack(name: string, version?: string) {
  const exit = await exec("brew", ["install", version !== undefined ? `${name}@${version}` : name])

  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }
}
