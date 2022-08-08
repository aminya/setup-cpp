/* eslint-disable require-atomic-updates */
import { InstallationInfo } from "./setupBin"
import { execRoot } from "sudo-tools"
import { info } from "../io/io"

let didUpdate: boolean = false
let didInit: boolean = false

/** A function that installs a package using pacman */
export function setupPacmanPack(name: string, version?: string, aur?: string): InstallationInfo {
  info(`Installing ${name} ${version ?? ""} via pacman`)

  const pacman = "pacman"

  if (!didUpdate) {
    execRoot(pacman, ["-Syuu", "--noconfirm"])
    didUpdate = true
  }

  if (!didInit) {
    // install base-devel
    execRoot(pacman, ["-Sy", "--noconfirm", "base-devel"])
    didInit = true
  }

  if (version !== undefined && version !== "") {
    try {
      execRoot(aur ?? pacman, ["-S", "--noconfirm", `${name}=${version}`])
    } catch {
      execRoot(aur ?? pacman, ["-S", "--noconfirm", `${name}${version}`])
    }
  } else {
    execRoot(aur ?? pacman, ["-S", "--noconfirm", name])
  }

  return { binDir: "/usr/bin/" }
}
