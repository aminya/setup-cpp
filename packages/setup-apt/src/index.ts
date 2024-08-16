import { promises } from "fs"
import { defaultExecOptions, execRoot, execRootSync } from "admina"
import { GITHUB_ACTIONS } from "ci-info"
import { info, warning } from "ci-log"
import escapeRegex from "escape-string-regexp"
import { type ExecaError, execa } from "execa"
import { sourceRC } from "os-env"
import type { RcOptions } from "os-env/dist/rc-file.js"
import { pathExists } from "path-exists"
import which from "which"
const { appendFile } = promises

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

// wait up to 300 seconds if the apt-get lock is held
export const aptTimeout = "Dpkg::Lock::Timeout=300"

export type AptPackage = {
  name: string
  version?: string
  repositories?: string[]
}

const retryErrors = [
  "E: Could not get lock",
  "dpkg: error processing archive",
  "dpkg: error: dpkg status database is locked by another process",
]

/** A function that installs a package using apt */
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

export function hasNala() {
  return which.sync("nala", { nothrow: true }) !== null
}

export function getApt() {
  let apt: string
  if (hasNala()) {
    apt = "nala"
  } else {
    apt = "apt-get"
  }
  return apt
}

function getEnv(apt: string) {
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

function updateRepos(apt: string) {
  execRootSync(
    apt,
    apt !== "nala" ? ["update", "-y", "-o", aptTimeout] : ["update", "-o", aptTimeout],
    { ...defaultExecOptions, env: getEnv(apt) },
  )
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

function initGpg() {
  execRootSync("gpg", ["-k"])
}

export async function addAptKeyViaServer(keys: string[], name: string, server = "keyserver.ubuntu.com") {
  try {
    const fileName = `/etc/apt/trusted.gpg.d/${name}`
    if (!(await pathExists(fileName))) {
      initGpg()

      await Promise.all(
        keys.map(async (key) => {
          await execRoot("gpg", [
            "--no-default-keyring",
            "--keyring",
            `gnupg-ring:${fileName}`,
            "--keyserver",
            server,
            "--recv-keys",
            key,
          ])
          await execRoot("chmod", ["644", fileName])
        }),
      )
    }
    return fileName
  } catch (err) {
    warning(`Failed to add apt key via server ${server}: ${err}`)
    return undefined
  }
}

export async function addAptKeyViaDownload(name: string, url: string) {
  const fileName = `/etc/apt/trusted.gpg.d/${name}`
  if (!(await pathExists(fileName))) {
    initGpg()
    await installAptPack([{ name: "curl" }, { name: "ca-certificates" }], undefined)
    await execa("curl", ["-s", url, "-o", `/tmp/${name}`])
    execRootSync("gpg", ["--no-default-keyring", "--keyring", `gnupg-ring:${fileName}`, "--import", `/tmp/${name}`])
    execRootSync("chmod", ["644", fileName])
  }
  return fileName
}

export async function updateAptAlternatives(name: string, path: string, rcOptions: RcOptions, priority: number = 40) {
  if (GITHUB_ACTIONS) {
    await execRoot("update-alternatives", ["--install", `/usr/bin/${name}`, name, path, priority.toString()])
  } else {
    await sourceRC(rcOptions)
    await appendFile(
      rcOptions.rcPath,
      `\nif [ $UID -eq 0 ]; then update-alternatives --install /usr/bin/${name} ${name} ${path} ${priority}; fi\n`,
    )
  }
}

export async function isAptPackInstalled(pack: string) {
  try {
    // check if a package is installed
    const { stdout } = await execa("dpkg", ["-s", pack], { env: getEnv("apt-get"), stdio: "pipe" })
    if (typeof stdout !== "string") {
      return false
    }
    const lines = stdout.split("\n")
    // check if the output contains a line that starts with "Status: install ok installed"
    return lines.some((line) => line.startsWith("Status: install ok installed"))
  } catch {
    return false
  }
}

export async function isAptPackRegexInstalled(regexp: string) {
  try {
    // check if a package matching the regexp is installed
    const { stdout } = await execa("dpkg", ["-l", regexp], { env: getEnv("apt-get"), stdio: "pipe" })
    if (typeof stdout !== "string") {
      return false
    }
    const lines = stdout.split("\n")
    // check if the output contains any lines that start with "ii"
    return lines.some((line) => line.startsWith("ii"))
  } catch {
    return false
  }
}
