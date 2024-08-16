import { grantUserWriteAccess } from "admina"
import { info, notice } from "ci-log"
import { addPath } from "envosman"
import { execaSync } from "execa"
import { pathExists } from "path-exists"
import { addShExt, addShRelativePrefix, dirname, join } from "patha"
import { installAptPack } from "setup-apt"
import which from "which"
import { rcOptions } from "../cli-options.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import { isUbuntu } from "../utils/env/isUbuntu.js"
import type { InstallationInfo } from "../utils/setup/setupBin.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

let hasVCPKG = false

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupVcpkg(version: string, setupDir: string, _arch: string): Promise<InstallationInfo> {
  if (!hasVCPKG || which.sync("vcpkg", { nothrow: true }) === null) {
    if (process.platform === "linux") {
      // vcpkg download and extraction dependencies
      if (isArch()) {
        await Promise.all([
          setupPacmanPack("curl"),
          setupPacmanPack("zip"),
          setupPacmanPack("unzip"),
          setupPacmanPack("tar"),
          setupPacmanPack("git"),
          setupPacmanPack("pkg-config"),
        ])
      } else if (hasDnf()) {
        await setupDnfPack([
          { name: "curl" },
          { name: "zip" },
          { name: "unzip" },
          { name: "tar" },
          { name: "git" },
          { name: "pkg-config" },
        ])
      } else if (isUbuntu()) {
        await installAptPack([
          { name: "curl" },
          { name: "zip" },
          { name: "unzip" },
          { name: "tar" },
          { name: "git" },
          { name: "pkg-config" },
        ])
      }
    }

    // clone if not already exists
    if (!(await pathExists(join(setupDir, addShExt("bootstrap-vcpkg", ".bat"))))) {
      execaSync("git", ["clone", "https://github.com/microsoft/vcpkg"], { cwd: dirname(setupDir), stdio: "inherit" })
    } else {
      notice(`Vcpkg folder already exists at ${setupDir}. Skipping the clone`)
    }

    // if version specified, checkout the version
    if (version !== "" && version !== "true") {
      info(`Checking out vcpkg version ${version}`)
      execaSync("git", ["checkout", version], {
        cwd: setupDir,
        stdio: "inherit",
      })
    }

    // bootstrap vcpkg
    execaSync(addShExt(addShRelativePrefix("bootstrap-vcpkg"), ".bat"), {
      cwd: setupDir,
      shell: true,
      stdio: "inherit",
    })

    await grantUserWriteAccess(setupDir)

    await addPath(setupDir, rcOptions)
    // eslint-disable-next-line require-atomic-updates
    hasVCPKG = true
    return { binDir: setupDir }
  }

  return { binDir: dirname(which.sync("vcpkg")) }
}
