/* eslint-disable require-atomic-updates */
import { InstallationInfo } from "./setupBin"
import { execSudo } from "../exec/sudo"
import { info } from "../io/io"

let didUpdate: boolean = false

/** A function that installs a package using dnf */
export function setupDnfPack(name: string, version?: string): InstallationInfo {
  info(`Installing ${name} ${version ?? ""} via dnf`)

  const dnf = "dnf"

  if (!didUpdate) {
    execSudo(dnf, ["-y", "check-update"])
    didUpdate = true
  }

  if (version !== undefined && version !== "") {
    execSudo(dnf, ["-y", "install", `${name}-${version}`])
  } else {
    execSudo(dnf, ["-y", "install", name])
  }

  return { binDir: "/usr/bin/" }
}
