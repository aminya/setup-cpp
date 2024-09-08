import { tmpdir } from "os"
import { join } from "path"
import { execRootSync, isRoot } from "admina"
import { info, warning } from "ci-log"
import { execa, execaSync } from "execa"
import which from "which"
import type { InstallationInfo } from "./setupBin.js"

/* eslint-disable require-atomic-updates */
let didUpdate: boolean = false
let didInit: boolean = false

/** A function that installs a package using pacman */
export async function setupPacmanPack(name: string, version?: string, aur?: string): Promise<InstallationInfo> {
  info(`Installing ${name} ${version ?? ""} via pacman`)

  const pacman = "pacman"

  if (aur === "yay") {
    setupYay()
  }

  // yay can't run as root, so skip update
  if (!didUpdate && aur !== "yay") {
    execRootSync(pacman, ["-Sy", "--noconfirm"])
    didUpdate = true
  }

  // install base-devel
  if (!didInit && aur !== "yay") {
    execRootSync(pacman, ["-S", "--noconfirm", "base-devel"])
    didInit = true
  }

  const runInstall = (arg: string) => {
    if (aur === "yay") {
      // run yay as non-root to fix ERROR: Running makepkg as root is not allowed as it can cause permanent, catastrophic damage to your system.
      if (isRoot() && createdBuilderUser) {
        // Run yay as builder user
        return execRootSync("su", ["-", "builder", "-c", `yay -S --noconfirm ${arg}`])
      } else {
        return execaSync(aur, ["-S", "--noconfirm", arg])
      }
    }
    return execRootSync(aur ?? pacman, ["-S", "--noconfirm", arg])
  }

  if (version !== undefined && version !== "") {
    // check if version is available
    const availableVersions = await availablePacmanVersions(pacman, name)
    if (availableVersions.includes(version)) {
      // try different version formats
      try {
        runInstall(`${name}=${version}`)
      } catch {
        runInstall(`${name}${version}`)
      }
    } else {
      // try without version
      info(`Failed to install ${name} ${version} via pacman, trying without version`)
      runInstall(name)
    }
  } else {
    // version not specified, install latest
    runInstall(name)
  }

  return { binDir: "/usr/bin/" }
}

const pacmanSiVersionRegex = /Version\s*:\s*(.*)/g

/** Query pacman for available versions */
async function availablePacmanVersions(pacman: string, name: string) {
  const availableVersions = []
  try {
    const { stdout } = await execa(pacman, ["-Si", name])

    for (const match of stdout.matchAll(pacmanSiVersionRegex)) {
      availableVersions.push(match[1])
    }
  } catch (err) {
    warning(`Failed to get available versions for ${name}: ${err}`)
  }
  return availableVersions
}

let createdBuilderUser = false

function setupYay() {
  if (which.sync("yay", { nothrow: true }) === null) {
    try {
      // Install prerequisites
      execRootSync("pacman", ["-S", "--noconfirm", "base-devel", "git"])

      const yayBuildDir = join(tmpdir(), "yay")

      execRootSync("mkdir", ["-p", yayBuildDir])

      if (isRoot()) {
        // Create a non-root user to build yay
        warning("Creating a non-root user to build yay")
        execRootSync("useradd", ["-m", "-G", "wheel", "builder"])
        execRootSync("passwd", ["-d", "builder"])
        execRootSync("chown", ["-R", "builder:builder", yayBuildDir])
        execRootSync("bash", ["-c", `echo "builder ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers`])
        createdBuilderUser = true

        // Clone the yay repository into a temporary directory
        execaSync("su", ["-", "builder", "-c", `git clone https://aur.archlinux.org/yay.git ${yayBuildDir}`], {
          stdio: "inherit",
        })

        execaSync("su", ["-", "builder", "-c", `cd ${yayBuildDir} && makepkg -si --noconfirm`], {
          stdio: "inherit",
        })
      } else {
        // Clone the yay repository into a temporary directory
        execaSync("git", ["clone", "https://aur.archlinux.org/yay.git", yayBuildDir], {
          stdio: "inherit",
          cwd: tmpdir(),
        })

        // Build and install yay
        execaSync("makepkg", ["-si", "--noconfirm"], {
          stdio: "inherit",
          cwd: yayBuildDir,
        })
      }

      // clean-up
      execaSync("rm", ["-rf", yayBuildDir], { stdio: "inherit" })
    } catch (error) {
      throw new Error(`Failed to install yay: ${error}. Install yay manually and re-run the script.`)
    }
  }
}
