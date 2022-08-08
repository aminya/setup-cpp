/* eslint-disable require-atomic-updates */
import { InstallationInfo } from "./setupBin"
import { execRootSync } from "root-tools"
import { info, warning } from "../io/io"

// let didUpdate: boolean = false

/** A function that installs a package using dnf */
export function setupDnfPack(name: string, version?: string): InstallationInfo {
  info(`Installing ${name} ${version ?? ""} via dnf`)

  const dnf = "dnf"

  // if (!didUpdate) {
  //   execRootSync(dnf, ["-y", "check-update"])
  //   didUpdate = true
  // }

  if (version !== undefined && version !== "") {
    try {
      execRootSync(dnf, ["-y", "install", `${name}-${version}`])
    } catch (err) {
      warning(`${(err as Error).toString()}\nInstalling the default version available via dnf`)
      execRootSync(dnf, ["-y", "install", name])
    }
  } else {
    execRootSync(dnf, ["-y", "install", name])
  }

  return { binDir: "/usr/bin/" }
}
