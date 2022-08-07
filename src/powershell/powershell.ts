import { addPath } from "../utils/env/addEnv"
import { addAptKeyViaDownload, setupAptPack } from "../utils/setup/setupAptPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { isArch } from "../utils/env/isArch"
import { hasDnf } from "../utils/env/hasDnf"
import { setupDnfPack } from "../utils/setup/setupDnfPack"
import { isUbuntu } from "../utils/env/isUbuntu"
import { execSudo } from "../utils/exec/sudo"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupPowershell(version: string | undefined, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("powershell", version)
      const binDir = "C:/Program Files/PowerShell/7"
      await addPath(binDir)
      return { binDir }
    }
    case "darwin": {
      return setupBrewPack("powershell", version, ["--cask"])
    }
    case "linux": {
      if (isArch()) {
        return setupPacmanPack("powershell-bin", version, "yay")
      } else if (hasDnf()) {
        setupDnfPack("curl")
        execSudo("/bin/bash", [
          "-c",
          `curl https://packages.microsoft.com/config/rhel/8/prod.repo | sudo tee /etc/yum.repos.d/microsoft.repo`,
        ])
        return setupDnfPack("powershell", version)
      } else if (isUbuntu()) {
        const keyFileName = await addAptKeyViaDownload(
          "microsoft.asc",
          "https://packages.microsoft.com/keys/microsoft.asc"
        )
        execSudo("/bin/bash", [
          "-c",
          `echo "deb [arch=amd64 signed-by=${keyFileName}] https://packages.microsoft.com/repos/microsoft-debian-bullseye-prod bullseye main" > /etc/apt/sources.list.d/microsoft.list`,
        ])
        return setupAptPack("powershell", version)
      }
      throw new Error(`Unsupported linux distribution`)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}
