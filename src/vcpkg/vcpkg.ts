import * as execa from "execa"
import { existsSync } from "fs"
import { dirname, join } from "path"
import which from "which"
import { addPath } from "../utils/env/addEnv"
import { isRoot } from "../utils/env/sudo"
import { execSudo } from "../utils/exec/sudo"
import { addShellExtension, addShellHere } from "../utils/extension/extension"
import { notice } from "../utils/io/io"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { InstallationInfo } from "../utils/setup/setupBin"

let hasVCPKG = false

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupVcpkg(_version: string, setupDir: string, _arch: string): InstallationInfo {
  if (!hasVCPKG || which.sync("vcpkg", { nothrow: true }) === null) {
    if (process.platform === "linux") {
      // vcpkg download and extraction dependencies
      setupAptPack("curl")
      setupAptPack("zip")
      setupAptPack("unzip")
      setupAptPack("tar")
      setupAptPack("git")
      setupAptPack("pkg-config")
    }

    if (!existsSync(join(setupDir, addShellExtension("bootstrap-vcpkg")))) {
      execa.execaSync("git", ["clone", "https://github.com/microsoft/vcpkg"], {
        cwd: dirname(setupDir),
        stdio: "inherit",
      })
    } else {
      notice(`Vcpkg folder already exists at ${setupDir}. This might mean that ~/vcpkg is restored from the cache.`)
    }

    execa.execaSync(addShellExtension(addShellHere("bootstrap-vcpkg")), {
      cwd: setupDir,
      shell: true,
      stdio: "inherit",
    })

    // change the owner to the SUDO_USER in setupDir. vcpkg requires this so it can install things without sudo
    if (
      (process.platform === "linux" || process.platform === "darwin") &&
      isRoot() &&
      process.env.SUDO_USER !== undefined
    ) {
      execSudo("chown", ["-R", process.env.SUDO_USER, setupDir], setupDir)
    }

    addPath(setupDir)
    // eslint-disable-next-line require-atomic-updates
    hasVCPKG = true
    return { binDir: setupDir }
  }

  return { binDir: dirname(which.sync("vcpkg")) }
}
