/* eslint-disable require-atomic-updates */
import { exec } from "@actions/exec"

let didUpdate: boolean = false

/** A function that installs a package using apt */
export async function setupAptPack(name: string, version?: string, updateRepositories: boolean = true) {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition
  const apt = process.env.CI || process.getuid?.() === 0 ? "sudo apt-get" : "apt-get"

  if (!didUpdate || updateRepositories) {
    await exec(apt, ["update"])
    didUpdate = true
  }

  const exit = await exec(apt, ["install", version !== undefined ? `${name}=${version}` : name])

  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }
}
