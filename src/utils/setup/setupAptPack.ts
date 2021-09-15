/* eslint-disable require-atomic-updates */
import { exec } from "@actions/exec"

let didUpdate: boolean = false

/** A function that installs a package using apt */
export async function setupAptPack(name: string, version?: string, updateRepositories: boolean = true) {
  if (!didUpdate || updateRepositories) {
    await exec("apt-get", ["update"])
    didUpdate = true
  }

  const exit = await exec("apt-get", ["install", version !== undefined ? `${name}=${version}` : name])

  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }
}
