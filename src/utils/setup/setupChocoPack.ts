/* eslint-disable require-atomic-updates */
import { addPath } from "../path/addPath"
import which from "which"
import { setupChocolatey } from "../../chocolatey/chocolatey"
import { InstallationInfo } from "./setupBin"
import execa from "execa"

let hasChoco = false

/** A function that installs a package using choco */
export async function setupChocoPack(name: string, version?: string, args: string[] = []): Promise<InstallationInfo> {
  if (!hasChoco || which.sync("choco", { nothrow: true }) === null) {
    await setupChocolatey("", "", process.arch)
    hasChoco = true
  }

  if (version !== undefined && version !== "") {
    execa.sync("choco", ["install", "-y", name, `--version=${version}`, ...args])
  } else {
    execa.sync("choco", ["install", "-y", name, ...args])
  }

  const binDir = "C:/ProgramData/Chocolatey/bin/"
  await addPath(binDir)
  return { binDir }
}
