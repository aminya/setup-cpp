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
    setupChocolatey("", "", process.arch)
    hasChoco = true
  }

  // https://github.com/jberezanski/ChocolateyPackages/issues/97#issuecomment-986825694
  const PATH = process.env.PATH
  const env = { ...process.env }
  delete env.TMP
  delete env.TEMP
  delete env.Path
  env.PATH = PATH

  if (version !== undefined && version !== "") {
    execa.sync("choco", ["install", "-y", name, `--version=${version}`, ...args], { env, extendEnv: false })
  } else {
    execa.sync("choco", ["install", "-y", name, ...args], { env, extendEnv: false })
  }

  const binDir = "C:/ProgramData/Chocolatey/bin/"
  addPath(binDir)
  return { binDir }
}
