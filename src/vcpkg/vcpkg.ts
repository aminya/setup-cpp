import { grantUserWriteAccess } from "admina"
import { notice } from "ci-log"
import { execaSync } from "execa"
import { pathExists } from "path-exists"
import { addShExt, addShRelativePrefix, dirname, join } from "patha"
import which from "which"
import { addPath } from "../utils/env/addEnv"
import { hasDnf } from "../utils/env/hasDnf"
import { isArch } from "../utils/env/isArch"
import { isUbuntu } from "../utils/env/isUbuntu"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { InstallationInfo } from "../utils/setup/setupBin"
import { setupDnfPack } from "../utils/setup/setupDnfPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"

let hasVCPKG = false

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupVcpkg(_version: string, setupDir: string, _arch: string): Promise<InstallationInfo> {
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
        await setupAptPack([
          { name: "curl" },
          { name: "zip" },
          { name: "unzip" },
          { name: "tar" },
          { name: "git" },
          { name: "pkg-config" },
        ])
      }
    }

    if (!(await pathExists(join(setupDir, addShExt("bootstrap-vcpkg", ".bat"))))) {
      execaSync("git", ["clone", "https://github.com/microsoft/vcpkg"], { cwd: dirname(setupDir), stdio: "inherit" })
    } else {
      notice(`Vcpkg folder already exists at ${setupDir}. This might mean that ~/vcpkg is restored from the cache.`)
    }

    execaSync(addShExt(addShRelativePrefix("bootstrap-vcpkg"), ".bat"), {
      cwd: setupDir,
      shell: true,
      stdio: "inherit",
    })

    await grantUserWriteAccess(setupDir)

    await addPath(setupDir)
    // eslint-disable-next-line require-atomic-updates
    hasVCPKG = true
    return { binDir: setupDir }
  }

  return { binDir: dirname(which.sync("vcpkg")) }
}
