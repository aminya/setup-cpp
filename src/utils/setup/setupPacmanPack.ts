/* eslint-disable require-atomic-updates */
import { InstallationInfo } from "./setupBin"
import { execSudo } from "../exec/sudo"
import { info } from "@actions/core"
import { isGitHubCI } from "../env/isci"
import { cpprc_path, setupCppInProfile } from "../env/addEnv"
import { appendFileSync } from "fs"

let didUpdate: boolean = false
let didInit: boolean = false

/** A function that installs a package using pacman */
export function setupPacmanPack(
  name: string,
  version?: string,
  aur?: string,
): InstallationInfo {
  info(`Installing ${name} ${version ?? ""} via pacman`)

  const pacman = "pacman"

  if (!didUpdate) {
    execSudo(pacman, ["-Syuu", "--noconfirm"])
    didUpdate = true
  }

  if (!didInit) {
    // install base-devel
    // set time - zone
    // TZ = Canada / Pacific
    // ln - snf / usr / share / zoneinfo / $TZ / etc / localtime && echo $TZ > /etc/timezone
    execSudo(pacman, [
      "-Sy",
      "--noconfirm",
      "base-devel",
    ])
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

export function updateAptAlternatives(name: string, path: string) {
  if (isGitHubCI()) {
    return execSudo("update-alternatives", ["--install", `/usr/bin/${name}`, name, path, "40"])
  } else {
    setupCppInProfile()
    return appendFileSync(
      cpprc_path,
      `\nif [ $UID -eq 0 ]; then update-alternatives --install /usr/bin/${name} ${name} ${path} 40; fi\n`
    )
  }
}
