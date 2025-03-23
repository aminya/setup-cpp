import { execRootSync } from "admina"
import { error } from "ci-log"
import { addPath } from "envosman"
import { addExeExt } from "patha"
import { hasApk, installApkPackage } from "setup-alpine"
import { installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { rcOptions } from "../cli-options.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import { ubuntuVersion } from "../utils/env/ubuntu_version.js"
import { type PackageInfo, setupBin } from "../utils/setup/setupBin.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

/** Get the platform data for cmake */
function getPowerShellPackageInfo(version: string, platform: NodeJS.Platform, arch: string): PackageInfo {
  return {
    url: getPowershellUrl(platform, arch, version),
    binRelativeDir: "",
    binFileName: addExeExt("pwsh"),
    extractedFolderName: "",
  }
}

function getPowershellUrl(
  platform: string,
  arch: string,
  version: string,
) {
  switch (platform) {
    case "win32": {
      const osArchStr = (["ia32", "x86", "i386", "x32"].includes(arch))
        ? "win-x86"
        : "win-x64"

      return `https://github.com/PowerShell/PowerShell/releases/download/v${version}/PowerShell-${version}-${osArchStr}.zip`
    }
    case "darwin": {
      const osArchStr = ["arm", "arm64"].includes(arch) ? "osx-arm64" : "osx-x64"

      return `https://github.com/PowerShell/PowerShell/releases/download/v${version}/powershell-${version}-${osArchStr}.tar.gz`
    }
    case "linux": {
      const archMap = {
        arm64: "linux-arm64",
        arm: "linux-arm64",
        arm32: "linux-arm32",
        aarch64: "linux-arm64",
        x64: "linux-x64",
      } as Record<string, string | undefined>
      const osArchStr = archMap[arch] ?? "linux-x64"
      // TODO support musl
      return `https://github.com/PowerShell/PowerShell/releases/download/v${version}/powershell-${version}-${osArchStr}.tar.gz`
    }
    default:
      throw new Error(`Unsupported platform '${platform}'`)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupPowershell(version: string, setupDir: string, arch: string) {
  try {
    return await setupBin("pwsh", version, getPowerShellPackageInfo, setupDir, arch)
  } catch (err) {
    error(`Failed to setup pwsh via download: ${err}. Trying package managers...`)
    return setupPowershellSystem(version, setupDir, arch)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupPowershellSystem(version: string | undefined, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("powershell-core", version)
      const binDir = "C:/Program Files/PowerShell/7"
      await addPath(binDir, rcOptions)
      return { binDir }
    }
    case "darwin": {
      return installBrewPack("powershell", version, { cask: true, overwrite: false })
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
        // const keyFileName = await addAptKeyViaURL(
        //   "microsoft.asc",
        //   "https://packages.microsoft.com/keys/microsoft.asc"
        // )
        // execRootSync("/bin/bash", [
        //   "-c",
        //   `echo "deb [arch=amd64 signed-by=${keyFileName}] https://packages.microsoft.com/repos/microsoft-debian-bullseye-prod bullseye main" > /etc/apt/sources.list.d/microsoft.list`,
        // ])

        return installAptPack([{ name: "powershell", version }], true)
      } else if (await hasApk()) {
        return installApkPackage([{ name: "powershell", version }])
      }
      throw new Error("Unsupported linux distribution")
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
