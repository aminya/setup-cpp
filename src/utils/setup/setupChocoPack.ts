/* eslint-disable require-atomic-updates */
import { exec } from "@actions/exec"
import which from "which"
import { setupChocolatey } from "../../chocolatey/chocolatey"

let hasChoco = false

/** A function that installs a package using choco */
export async function setupChocoPack(name: string, version?: string, args: string[] = []) {
  if (!hasChoco || which.sync("choco", { nothrow: true }) === null) {
    await setupChocolatey()
    hasChoco = true
  }

  let exit
  if (version === undefined) {
    exit = await exec("choco", ["install", "-y", name, ...args])
  } else {
    exit = await exec("choco", ["install", "-y", name, `--version=${version}`, ...args])
  }

  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }
}