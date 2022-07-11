/* eslint-disable require-atomic-updates */
import { InstallationInfo } from "./setupBin"
import { execSudo } from "../exec/sudo"
import { info, warning } from "../io/io"

// let didUpdate: boolean = false

/** A function that installs a package using dnf */
export function setupDnfPack(name: string, version?: string): InstallationInfo {
  info(`Installing ${name} ${version ?? ""} via dnf`)

  const dnf = "dnf"

  // if (!didUpdate) {
  //   execSudo(dnf, ["-y", "check-update"])
  //   didUpdate = true
  // }

  if (version !== undefined && version !== "") {
    try {
      execSudo(dnf, ["-y", "install", `${name}-${version}`])
    } catch (err) {
      warning(`${(err as Error).toString()}\nInstalling the default version available via dnf`)
      execSudo(dnf, ["-y", "install", name])
    }
  } else {
    execSudo(dnf, ["-y", "install", name])
  }

  return { binDir: "/usr/bin/" }
}
