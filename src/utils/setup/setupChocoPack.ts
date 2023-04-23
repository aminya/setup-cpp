/* eslint-disable require-atomic-updates */
import { addPath } from "../env/addEnv"
import which from "which"
import { setupChocolatey } from "../../chocolatey/chocolatey"
import { InstallationInfo } from "./setupBin"
import { execaSync } from "execa"
import { info } from "@actions/core"
import { notice } from "ci-log"

let hasChoco = false

/** A function that installs a package using choco */
export async function setupChocoPack(name: string, version?: string, args: string[] = []): Promise<InstallationInfo> {
  info(`Installing ${name} ${version ?? ""} via chocolatey`)

  if (!hasChoco || which.sync("choco", { nothrow: true }) === null) {
    await setupChocolatey("", "", process.arch)
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
    execaSync("choco", ["install", "-y", name, `--version=${version}`, ...args], {
      env,
      extendEnv: false,
      stdio: "inherit",
    })
  } else {
    try {
      execaSync("choco", ["install", "-y", name, ...args], { env, extendEnv: false, stdio: "inherit" })
    } catch (err) {
      // if the package requires a reboot, downgrade the error to a notice
      if ((err as Error).message.includes("exit code 3010")) {
        notice(`${name} might require a reboot for the completion of the installation.`)
      } else {
        throw err
      }
    }
  }

  const binDir = `${process.env.ChocolateyInstall ?? "C:/ProgramData/chocolatey"}/bin`
  await addPath(binDir)

  return { binDir }
}
