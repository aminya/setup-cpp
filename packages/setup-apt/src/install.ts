import { defaultExecOptions, execRootSync } from "admina"
import { info, warning } from "ci-log"
import escapeRegex from "escape-string-regexp"
import { type ExecaError, execa } from "execa"
import which from "which"
import { addAptKeyViaServer } from "./apt-key.js"
import { isAptPackInstalled } from "./is-installed.js"
import { updateRepos } from "./update.js"

/**
 * The information about an installation result
 */
export type InstallationInfo = {
  /** The install dir of the package (Defaults to `undefined`) */
  installDir?: string
  /** The bin dir of the package (Defaults to `/usr/bin`) */
  binDir: string
  /** The bin path of the package (Defaults to `undefined`) */
  bin?: string
}

/* eslint-disable require-atomic-updates */
let didUpdate: boolean = false
let didInit: boolean = false

/**
 * The timeout to use for apt commands
 * Wait up to 300 seconds if the apt-get lock is held
 * @private Used internally
 */
export const aptTimeout = "Dpkg::Lock::Timeout=300"

/**
 * The information about an apt package
 */
export type AptPackage = {
  /** The name of the package */
  name: string
  /** The version of the package (optional) */
  version?: string
  /** The repositories to add before installing the package (optional) */
  repositories?: string[]
}

const retryErrors = [
  "E: Could not get lock",
  "dpkg: error processing archive",
  "dpkg: error: dpkg status database is locked by another process",
]

/**
 * Install a package using apt
 *
 * @param packages The packages to install (name, and optional info like version and repositories)
 * @param update Whether to update the package list before installing (Defaults to `false`)
 */
export async function installAptPack(packages: AptPackage[], update = false): Promise<InstallationInfo> {
  const apt: string = getApt()

  for (const { name, version } of packages) {
    info(`Installing ${name} ${version ?? ""} via ${apt}`)
  }

  // Update the repos if needed
  if (update) {
    updateRepos(apt)
    didUpdate = true
  }

  // Add the repos if needed
  await addRepositories(apt, packages)

  const needToInstall = await filterAndQualifyAptPackages(apt, packages)

  if (needToInstall.length === 0) {
    info("All packages are already installed")
    return { binDir: "/usr/bin/" }
  }

  // Initialize apt if needed
  if (!didInit) {
    await initApt(apt)
    didInit = true
  }

  // Install
  try {
    execRootSync(apt, ["install", "--fix-broken", "-y", ...needToInstall], { ...defaultExecOptions, env: getEnv(apt) })
  } catch (err) {
    if (isExecaError(err)) {
      if (retryErrors.some((error) => err.stderr.includes(error))) {
        warning(`Failed to install packages ${needToInstall}. Retrying...`)
        execRootSync(
          apt,
          ["install", "--fix-broken", "-y", "-o", aptTimeout, ...needToInstall],
          { ...defaultExecOptions, env: getEnv(apt) },
        )
      }
    } else {
      throw err
    }
  }

  return { binDir: "/usr/bin/" }
}

function isExecaError(err: unknown): err is ExecaError {
  return typeof (err as ExecaError).stderr === "string"
}

/**
 * Check if nala is installed
 */
export function hasNala() {
  return which.sync("nala", { nothrow: true }) !== null
}

/**
 * Get the apt command to use
 * If nala is installed, use that, otherwise use apt-get
 */
export function getApt() {
  let apt: string
  if (hasNala()) {
    apt = "nala"
  } else {
    apt = "apt-get"
  }
  return apt
}

/**
 * Get the environment variables to use for the apt command
 * @param apt The apt command to use
 * @private Used internally
 */
export function getEnv(apt: string) {
  const env: NodeJS.ProcessEnv = { ...process.env, DEBIAN_FRONTEND: "noninteractive" }

  if (apt === "nala") {
    // if LANG/LC_ALL is not set, enable utf8 otherwise nala fails because of ASCII encoding
    if (env.LANG === undefined) {
      env.LANG = "C.UTF-8"
    }
    if (env.LC_ALL === undefined) {
      env.LC_ALL = "C.UTF-8"
    }
  }

  return env
}

/**
 * The type of apt package to install
 */
export enum AptPackageType {
  NameDashVersion = 0,
  NameEqualsVersion = 1,
  Name = 2,
  None = 3,
}

/**
 * Filter out the packages that are already installed and qualify the packages into a full package name/version
 */
async function filterAndQualifyAptPackages(apt: string, packages: AptPackage[]) {
  return (await Promise.all(packages.map((pack) => qualifiedNeededAptPackage(apt, pack))))
    .filter((pack) => pack !== undefined)
}

async function qualifiedNeededAptPackage(apt: string, pack: AptPackage) {
  // Qualify the packages into full package name/version
  const qualified = await getAptArg(apt, pack.name, pack.version)
  // filter out the packages that are already installed
  return (await isAptPackInstalled(qualified)) ? undefined : qualified
}

async function addRepositories(apt: string, packages: AptPackage[]) {
  const allRepositories = [...new Set(packages.flatMap((pack) => pack.repositories ?? []))]
  if (allRepositories.length !== 0) {
    if (!didInit) {
      await initApt(apt)
      didInit = true
    }
    await installAddAptRepo(apt)
    for (const repo of allRepositories) {
      // eslint-disable-next-line no-await-in-loop
      execRootSync("add-apt-repository", ["-y", "--no-update", repo], { ...defaultExecOptions, env: getEnv(apt) })
    }
    updateRepos(apt)
    didUpdate = true
  }
}

async function aptPackageType(apt: string, name: string, version: string | undefined): Promise<AptPackageType> {
  if (version !== undefined && version !== "") {
    const { stdout } = await execa("apt-cache", [
      "search",
      "--names-only",
      `^${escapeRegex(name)}-${escapeRegex(version)}$`,
    ], { env: getEnv(apt), stdio: "pipe" })
    if (stdout.trim() !== "") {
      return AptPackageType.NameDashVersion
    }

    try {
      // check if apt-get show can find the version
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { stdout } = await execa("apt-cache", ["show", `${name}=${version}`], { env: getEnv(apt) })
      if (stdout.trim() === "") {
        return AptPackageType.NameEqualsVersion
      }
    } catch {
      // ignore
    }
  }

  try {
    const { stdout: showStdout } = await execa("apt-cache", ["show", name], { env: getEnv(apt), stdio: "pipe" })
    if (showStdout.trim() !== "") {
      return AptPackageType.Name
    }
  } catch {
    // ignore
  }

  // If apt-cache fails, update the repos and try again
  if (!didUpdate) {
    updateRepos(getApt())
    didUpdate = true
    return aptPackageType(apt, name, version)
  }

  return AptPackageType.None
}

async function getAptArg(apt: string, name: string, version: string | undefined) {
  const package_type = await aptPackageType(apt, name, version)
  switch (package_type) {
    case AptPackageType.NameDashVersion:
      return `${name}-${version}`
    case AptPackageType.NameEqualsVersion:
      return `${name}=${version}`
    case AptPackageType.Name:
      if (version !== undefined && version !== "") {
        warning(`Could not find package ${name} with version ${version}. Installing the latest version.`)
      }
      return name
    default:
      throw new Error(`Could not find package ${name} ${version ?? ""}`)
  }
}

async function installAddAptRepo(apt: string) {
  if (await isAptPackInstalled("software-properties-common")) {
    return
  }
  execRootSync(
    apt,
    ["install", "-y", "--fix-broken", "-o", aptTimeout, "software-properties-common"],
    { ...defaultExecOptions, env: getEnv(apt) },
  )
}

/** Install gnupg and certificates (usually missing from docker containers) */
async function initApt(apt: string) {
  // Update the repos if needed
  if (!didUpdate) {
    updateRepos(apt)
    didUpdate = true
  }

  const toInstall = await filterAndQualifyAptPackages(apt, [
    { name: "ca-certificates" },
    { name: "gnupg" },
    { name: "apt-utils" },
  ])

  if (toInstall.length !== 0) {
    execRootSync(apt, ["install", "-y", "--fix-broken", "-o", aptTimeout, ...toInstall], {
      ...defaultExecOptions,
      env: getEnv(apt),
    })
  }

  await Promise.all([
    addAptKeyViaServer(["3B4FE6ACC0B21F32", "40976EAF437D05B5"], "setup-cpp-ubuntu-archive.gpg"),
    addAptKeyViaServer(["1E9377A2BA9EF27F"], "launchpad-toolchain.gpg"),
  ])
}
