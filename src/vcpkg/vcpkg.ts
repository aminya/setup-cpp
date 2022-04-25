import { addPath, warning } from "@actions/core"
import execa from "execa"
import { existsSync } from "fs"
import { dirname, join } from "path"
import which from "which"
import { addShellExtension, addShellHere } from "../utils/extension/extension"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { InstallationInfo } from "../utils/setup/setupBin"

let hasVCPKG = false

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupVcpkg(_version: string, setupDir: string, _arch: string): Promise<InstallationInfo> {
  if (!hasVCPKG || which.sync("vcpkg", { nothrow: true }) === null) {
    if (process.platform === "linux") {
      // vcpkg download and extraction dependencies
      await setupAptPack("curl")
      await setupAptPack("zip")
      await setupAptPack("unzip")
      await setupAptPack("tar")
      await setupAptPack("git")
      await setupAptPack("pkg-config")
    }

    if (!existsSync(join(setupDir, addShellExtension("bootstrap-vcpkg")))) {
      execa.sync("git", ["clone", "https://github.com/microsoft/vcpkg"], { cwd: dirname(setupDir), stdio: "inherit" })
    } else {
      warning(`Vcpkg folder already exists at ${setupDir}`)
    }

    // allow read/write for everyone in setupDir. vcpkg requires this so it can install things without sudo
    if (process.platform === "linux" || process.platform === "darwin") {
      // https://chmodcommand.com/chmod-666/
      execa.sync("chmod", ["-R", "666", setupDir], { cwd: setupDir, stdio: "inherit" })
    }

    execa.sync(addShellExtension(addShellHere("bootstrap-vcpkg")), { cwd: setupDir, shell: true, stdio: "inherit" })
    addPath(setupDir)
    // eslint-disable-next-line require-atomic-updates
    hasVCPKG = true
    return { binDir: setupDir }
  }

  return { binDir: dirname(which.sync("vcpkg")) }
}
