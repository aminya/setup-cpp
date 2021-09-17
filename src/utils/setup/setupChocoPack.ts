/* eslint-disable require-atomic-updates */
import { addPath } from "@actions/core"
import which from "which"
import { setupChocolatey } from "../../chocolatey/chocolatey"
import { InstallationInfo } from "./setupBin"
import spawn from "cross-spawn"

let hasChoco = false

/** A function that installs a package using choco */
export async function setupChocoPack(name: string, version?: string, args: string[] = []): Promise<InstallationInfo> {
  if (!hasChoco || which.sync("choco", { nothrow: true }) === null) {
    await setupChocolatey("", "", process.arch)
    hasChoco = true
  }

  let exit
  if (version !== undefined && version !== "") {
    exit = spawn.sync("choco", ["install", "-y", name, `--version=${version}`, ...args], { stdio: "inherit" }).status
  } else {
    exit = spawn.sync("choco", ["install", "-y", name, ...args], { stdio: "inherit" }).status
  }

  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }

  const binDir = "C:/ProgramData/Chocolatey/bin/"
  addPath(binDir)
  return { binDir }
}
