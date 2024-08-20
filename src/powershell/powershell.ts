import { execRootSync } from "admina"
import { addPath } from "envosman"
import { installAptPack } from "setup-apt"
import { rcOptions } from "../cli-options.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { ubuntuVersion } from "../utils/env/ubuntu_version.js"
import { setupBrewPack } from "../utils/setup/setupBrewPack.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupPowershell(version: string | undefined, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("powershell-core", version)
      const binDir = "C:/Program Files/PowerShell/7"
      await addPath(binDir, rcOptions)
      return { binDir }
    }
    case "darwin": {
      return setupBrewPack("powershell", version, { cask: true })
    }
    case "linux": {
      if (isArch()) {
        return setupPacmanPack("powershell-bin", version, "yay")
      } else if (hasDnf()) {
        await setupDnfPack([{ name: "curl" }])
        execRootSync("/bin/bash", [
          "-c",
          "curl https://packages.microsoft.com/config/rhel/8/prod.repo | sudo tee /etc/yum.repos.d/microsoft.repo",
        ])
        return setupDnfPack([{ name: "powershell", version }])
      } else if (isUbuntu()) {
        await installAptPack([{ name: "curl" }])
        const ubuntuVerSplitted = (await ubuntuVersion())!
        const ubuntuVersionString = `${ubuntuVerSplitted[0]}.0${ubuntuVerSplitted[1]}`

        execRootSync("curl", [
          "-LJO",
          `https://packages.microsoft.com/config/ubuntu/${ubuntuVersionString}/packages-microsoft-prod.deb`,
        ])
        execRootSync("dpkg", ["-i", "packages-microsoft-prod.deb"])

        // TODO Debian
        // const keyFileName = await addAptKeyViaDownload(
        //   "microsoft.asc",
        //   "https://packages.microsoft.com/keys/microsoft.asc"
        // )
        // execRootSync("/bin/bash", [
        //   "-c",
        //   `echo "deb [arch=amd64 signed-by=${keyFileName}] https://packages.microsoft.com/repos/microsoft-debian-bullseye-prod bullseye main" > /etc/apt/sources.list.d/microsoft.list`,
        // ])

        return installAptPack([{ name: "powershell", version }], true)
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
