import { dirname } from "path"
import { addPath } from "envosman"
import { execaSync } from "execa"
import { pathExists } from "path-exists"
import which from "which"
import { rcOptions } from "../cli-options.js"
import type { InstallationInfo } from "../utils/setup/setupBin.js"

/* eslint-disable require-atomic-updates */
let binDir: string | undefined

export async function setupChocolatey(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _version: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _setupDir: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _arch: string,
): Promise<InstallationInfo | undefined> {
  if (process.platform !== "win32") {
    return undefined
  }

  if (typeof binDir === "string") {
    return { binDir }
  }

  const maybeBinDir = which.sync("choco", { nothrow: true })
  if (maybeBinDir !== null) {
    binDir = dirname(maybeBinDir)
    return { binDir }
  }

  let powershell = "powershell.exe"
  const maybePowerShell = which.sync(`${process.env.SystemRoot}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`, {
    nothrow: true,
  })
  if (maybePowerShell !== null) {
    powershell = maybePowerShell
  }

  // https://docs.chocolatey.org/en-us/choco/setup#install-with-cmd.exe
  execaSync(
    powershell,
    [
      "-NoProfile",
      "-InputFormat",
      "None",
      "-ExecutionPolicy",
      "Bypass",
      "-Command",
      "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))",
    ],
    { stdio: "inherit" },
  )

  const chocoPath = `${process.env.ALLUSERSPROFILE}\\chocolatey\\bin`
  await addPath(chocoPath, rcOptions)

  const maybeChoco = which.sync("choco", { nothrow: true })
  if (maybeChoco !== null) {
    binDir = dirname(maybeChoco)
  } else {
    binDir = `${process.env.ChocolateyInstall ?? "C:/ProgramData/chocolatey"}/bin`
  }

  if (await pathExists(binDir)) {
    return { binDir }
  }
  return undefined
}
