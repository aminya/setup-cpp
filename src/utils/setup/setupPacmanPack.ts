import { InstallationInfo } from "./setupBin"
import { execRootSync } from "admina"
import { info, warning } from "ci-log"
import { execa } from "execa"

/* eslint-disable require-atomic-updates */
let didUpdate: boolean = false
let didInit: boolean = false

/** A function that installs a package using pacman */
export async function setupPacmanPack(name: string, version?: string, aur?: string): Promise<InstallationInfo> {
  info(`Installing ${name} ${version ?? ""} via pacman`)

  const pacman = "pacman"

  // yay can't run as root, so skip update
  if (!didUpdate && aur !== "yay") {
    execRootSync(pacman, ["-Sy", "--noconfirm"])
    didUpdate = true
  }

  // install base-devel
  if (!didInit) {
    execRootSync(pacman, ["-S", "--noconfirm", "base-devel"])
    didInit = true
  }

  const runInstall = (arg: string) => {
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
