/* eslint-disable require-atomic-updates */
import * as execa from "execa"
import { existsSync } from "fs"
import { dirname } from "path"
import which from "which"
import { InstallationInfo } from "../utils/setup/setupBin"

let binDir: string | undefined

export function setupChocolatey(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _version: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _setupDir: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _arch: string
): InstallationInfo | undefined {
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

  // https://docs.chocolatey.org/en-us/choco/setup#install-with-cmd.exe
  execa.execaCommandSync(
    `@"%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\\chocolatey\\bin"`
  )

  const maybeChoco = which.sync("choco", { nothrow: true })
  if (maybeChoco !== null) {
    binDir = dirname(maybeChoco)
  } else {
    binDir = "C:/ProgramData/Chocolatey/bin/"
  }

  if (existsSync(binDir)) {
    return { binDir }
  }
  return undefined
}
