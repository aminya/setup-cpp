/* eslint-disable require-atomic-updates */
import { exec } from "@actions/exec"
import which from "which"
import { setupChocolatey } from "../../chocolatey/chocolatey"
import { InstallationInfo } from "./setupBin"

let hasChoco = false

/** A function that installs a package using choco */
export async function setupChocoPack(name: string, version?: string, args: string[] = []): Promise<InstallationInfo> {
  if (!hasChoco || which.sync("choco", { nothrow: true }) === null) {
    await setupChocolatey("", "", process.arch)
    hasChoco = true
  }

  let exit
  if (version !== undefined && version !== "") {
    exit = await exec("choco", ["install", "-y", name, `--version=${version}`, ...args])
  } else {
    exit = await exec("choco", ["install", "-y", name, ...args])
  }

  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }

  return { binDir: "C:\\ProgramData\\Chocolatey\\bin\\" }
}
