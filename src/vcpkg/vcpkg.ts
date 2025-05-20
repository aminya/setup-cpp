import { dirname, join } from "path"
import { grantUserWriteAccess } from "admina"
import { info, notice } from "ci-log"
import { addEnv, addPath } from "envosman"
import { execa } from "execa"
import { pathExists } from "path-exists"
import { addShExt, addShRelativePrefix } from "patha"
import { hasApk, installApkPack } from "setup-alpine"
import { hasAptGet, installAptPack } from "setup-apt"
import which from "which"
import { setupGit } from "../git/git.js"
import { rcOptions } from "../options.js"
import { arm64 } from "../utils/env/arch.js"
import { hasDnf } from "../utils/env/hasDnf.js"
import { isArch } from "../utils/env/isArch.js"
import type { InstallationInfo } from "../utils/setup/setupBin.js"
import { setupDnfPack } from "../utils/setup/setupDnfPack.js"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack.js"

let hasVCPKG = false

export async function setupVcpkg(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  const vcpkg = await which("vcpkg", { nothrow: true })

  if (hasVCPKG && vcpkg !== null) {
    return { binDir: dirname(vcpkg) }
  }

  // vcpkg dependencies
  await setupGit("", setupDir, arch)

  if (process.platform === "linux") {
    if (isArch()) {
      await Promise.all([
        setupPacmanPack("curl"),
        setupPacmanPack("zip"),
        setupPacmanPack("unzip"),
        setupPacmanPack("tar"),
        setupPacmanPack("pkg-config"),
      ])
    } else if (hasDnf()) {
      await setupDnfPack([
        { name: "curl" },
        { name: "zip" },
        { name: "unzip" },
        { name: "tar" },
        { name: "pkg-config" },
      ])
    } else if (hasAptGet()) {
      await installAptPack([
        { name: "curl" },
        { name: "zip" },
        { name: "unzip" },
        { name: "tar" },
        { name: "pkg-config" },
      ])
    } else if (await hasApk()) {
      const deps = [
        { name: "curl" },
        { name: "zip" },
        { name: "unzip" },
        { name: "tar" },
        { name: "pkgconf" },
      ]
      if (arm64.includes(arch)) {
        deps.push({ name: "build-base" })
      }
      await installApkPack(deps)
    }
  }

  if (await pathExists(join(setupDir, addShExt("bootstrap-vcpkg", ".bat")))) {
    notice(`Vcpkg folder already exists at ${setupDir}. Skipping the clone`)
  } else {
    // clone if not already exists
    await execa("git", ["clone", "https://github.com/microsoft/vcpkg"], { cwd: dirname(setupDir), stdio: "inherit" })
  }

  // if version specified, checkout the version
  if (version !== "" && version !== "true") {
    info(`Checking out vcpkg version ${version}`)
    await execa("git", ["checkout", version], {
      cwd: setupDir,
      stdio: "inherit",
    })
  }

  // Add VCPKG_FORCE_SYSTEM_BINARIES=1 for Linux arm64
  if (process.platform === "linux" && arm64.includes(arch)) {
    await addEnv("VCPKG_FORCE_SYSTEM_BINARIES", "1", rcOptions)
  }

  // bootstrap vcpkg
  await execa(addShExt(addShRelativePrefix("bootstrap-vcpkg"), ".bat"), {
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
