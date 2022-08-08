import execa from "execa"
import { existsSync } from "fs"
import { dirname, join } from "path"
import which from "which"
import { addPath } from "../utils/env/addEnv"
import { addShellExtension, addShellHere } from "extension-tools"
import { notice } from "ci-log"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"
import { InstallationInfo } from "../utils/setup/setupBin"
import { isArch } from "../utils/env/isArch"
import { hasDnf } from "../utils/env/hasDnf"
import { setupDnfPack } from "../utils/setup/setupDnfPack"
import { isUbuntu } from "../utils/env/isUbuntu"
import { giveUserAccess } from "user-access"

let hasVCPKG = false

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupVcpkg(_version: string, setupDir: string, _arch: string): Promise<InstallationInfo> {
  if (!hasVCPKG || which.sync("vcpkg", { nothrow: true }) === null) {
    if (process.platform === "linux") {
      // vcpkg download and extraction dependencies
      if (isArch()) {
        setupPacmanPack("curl")
        setupPacmanPack("zip")
        setupPacmanPack("unzip")
        setupPacmanPack("tar")
        setupPacmanPack("git")
        setupPacmanPack("pkg-config")
      } else if (hasDnf()) {
        setupDnfPack("curl")
        setupDnfPack("zip")
        setupDnfPack("unzip")
        setupDnfPack("tar")
        setupDnfPack("git")
        setupDnfPack("pkg-config")
      } else if (isUbuntu()) {
        await setupAptPack("curl")
        await setupAptPack("zip")
        await setupAptPack("unzip")
        await setupAptPack("tar")
        await setupAptPack("git")
        await setupAptPack("pkg-config")
      }
    }

    if (!existsSync(join(setupDir, addShellExtension("bootstrap-vcpkg")))) {
      execa.sync("git", ["clone", "https://github.com/microsoft/vcpkg"], { cwd: dirname(setupDir), stdio: "inherit" })
    } else {
      notice(`Vcpkg folder already exists at ${setupDir}. This might mean that ~/vcpkg is restored from the cache.`)
    }

    execa.sync(addShellExtension(addShellHere("bootstrap-vcpkg")), { cwd: setupDir, shell: true, stdio: "inherit" })

    giveUserAccess(setupDir)

    await addPath(setupDir)
    // eslint-disable-next-line require-atomic-updates
    hasVCPKG = true
    return { binDir: setupDir }
  }

  return { binDir: dirname(which.sync("vcpkg")) }
}
