/* eslint-disable require-atomic-updates */
import { InstallationInfo } from "./setupBin"
import { execRootSync } from "admina"
import { info } from "ci-log"

let didUpdate: boolean = false
let didInit: boolean = false

/** A function that installs a package using pacman */
export function setupPacmanPack(name: string, version?: string, aur?: string): InstallationInfo {
  info(`Installing ${name} ${version ?? ""} via pacman`)

  const pacman = "pacman"

  // yay can't run as root, so skip update
  if (!didUpdate && aur !== "yay") {
    execRootSync(pacman, ["-Sy", "--noconfirm"])
    didUpdate = true
  }

  if (!didInit) {
    // install base-devel
    execRootSync(pacman, ["-S", "--noconfirm", "base-devel"])
    didInit = true
  }

  if (version !== undefined && version !== "") {
    try {
      execRootSync(aur ?? pacman, ["-S", "--noconfirm", `${name}=${version}`])
    } catch {
      execRootSync(aur ?? pacman, ["-S", "--noconfirm", `${name}${version}`])
    }
  } else {
    execRootSync(aur ?? pacman, ["-S", "--noconfirm", name])
  }

  return { binDir: "/usr/bin/" }
}
