import { execRootSync } from "admina"
import { info, warning } from "ci-log"
import { execa } from "execa"

/** The information about an installation result. */
export type InstallationInfo = {
  /** The install dir of the package (Defaults to `undefined`). */
  installDir?: string
  /** The bin dir of the package. */
  binDir: string
  /** The path to the package binary (Defaults to `undefined`). */
  bin?: string
}

/** The information about a dnf package. */
export type DnfPackage = {
  /** The name of the package. */
  name: string
  /** The optional package version. */
  version?: string
}

/** A function that installs packages using dnf. */
export async function setupDnfPack(packages: DnfPackage[]): Promise<InstallationInfo> {
  for (const { name, version } of packages) {
    info(`Installing ${name} ${version ?? ""} via dnf`)
  }

  const dnfArgs = await Promise.all(packages.map((pack) => getDnfArg(pack.name, pack.version)))
  execRootSync("dnf", ["-y", "install", ...dnfArgs])

  return { binDir: "/usr/bin/" }
}

async function getDnfArg(name: string, version: string | undefined) {
  if (version === undefined || version === "") {
    return name
  }

  // check if name-version is available
  const { stdout: nameDashVersionSearch } = await execa("dnf", ["search", "-q", `${name}-${version}`])
  if (nameDashVersionSearch.trim() !== "") {
    return `${name}-${version}`
  }

  // try with ${name}${version}
  const { stdout: nameVersionSearch } = await execa("dnf", ["search", "-q", `${name}${version}`])
  if (nameVersionSearch.trim() !== "") {
    return `${name}${version}`
  }

  warning(`Failed to install ${name} ${version} via dnf, trying without version`)
  return name
}
