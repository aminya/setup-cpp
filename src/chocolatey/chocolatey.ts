import { exec } from "@actions/exec"
import which from "which"

export async function setupChocolatey() {
  if (which.sync("choco", { nothrow: true }) !== null) {
    return
  }

  // https://docs.chocolatey.org/en-us/choco/setup#install-with-cmd.exe
  const exit = await exec(
    `@"%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\\chocolatey\\bin"`
  )

  if (exit !== 0) {
    throw new Error(`Failed to install chocolatey`)
  }
}
