/* eslint-disable require-atomic-updates */
import { InstallationInfo } from "./setupBin"
import { execSudo } from "sudo-tools"
import { info } from "../io/io"

let didUpdate: boolean = false
let didInit: boolean = false

/** A function that installs a package using pacman */
export function setupPacmanPack(name: string, version?: string, aur?: string): InstallationInfo {
  info(`Installing ${name} ${version ?? ""} via pacman`)

  const pacman = "pacman"

  if (!didUpdate) {
    execSudo(pacman, ["-Syuu", "--noconfirm"])
    didUpdate = true
  }

  if (!didInit) {
    // install base-devel
    execSudo(pacman, ["-Sy", "--noconfirm", "base-devel"])
    didInit = true
  }

  if (version !== undefined && version !== "") {
    try {
      execSudo(aur ?? pacman, ["-S", "--noconfirm", `${name}=${version}`])
    } catch {
      execSudo(aur ?? pacman, ["-S", "--noconfirm", `${name}${version}`])
    }
  } else {
    execSudo(aur ?? pacman, ["-S", "--noconfirm", name])
  }

  return { binDir: "/usr/bin/" }
}
