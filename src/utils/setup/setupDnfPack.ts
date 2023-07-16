import { InstallationInfo } from "./setupBin"
import { execRootSync } from "admina"
import { info, warning } from "ci-log"
import { execa } from "execa"

export type DnfPackage = {
  name: string
  version?: string
}

/** A function that installs a package using dnf */
export async function setupDnfPack(packages: DnfPackage[]): Promise<InstallationInfo> {
  for (const { name, version } of packages) {
    info(`Installing ${name} ${version ?? ""} via dnf`)
  }

  const dnfArgs = await Promise.all(packages.map((pack) => getDnfArg(pack.name, pack.version)))
  execRootSync("dnf", ["-y", "install", ...dnfArgs])

  return { binDir: "/usr/bin/" }
}

async function getDnfArg(name: string, version: string | undefined) {
  if (version !== undefined && version !== "") {
    // check if name-version is available
    const { stdout } = await execa("dnf", ["search", `${name}-${version}`, "--exact", "--quiet"])

    if (stdout.trim() !== "") {
      return `${name}-${version}`
    } else {
      warning(`Failed to install ${name} ${version} via dnf, trying without version`)
    }
  }
  return name
}
