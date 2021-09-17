/* eslint-disable require-atomic-updates */
import spawn from "cross-spawn"
import { existsSync } from "fs"
import { dirname } from "path"
import which from "which"
import { InstallationInfo } from "../utils/setup/setupBin"

let binDir: string | undefined

export function setupChocolatey(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _version: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _setupCppDir: string,
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
  const exit = spawn.sync(
    `@"%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\\chocolatey\\bin"`,
    { stdio: "inherit" }
  ).status

  if (exit !== 0) {
    throw new Error(`Failed to install chocolatey`)
  }

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
