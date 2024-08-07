import { execRoot, execRootSync } from "admina"
import { GITHUB_ACTIONS } from "ci-info"
import { info, warning } from "ci-log"
import escapeRegex from "escape-string-regexp"
import { type ExecaError, execa } from "execa"
import { appendFile } from "fs/promises"
import { pathExists } from "path-exists"
import which from "which"
import { addEnv, cpprc_path, sourceCpprc } from "../env/addEnv"
import type { InstallationInfo } from "./setupBin"

/* eslint-disable require-atomic-updates */
let didUpdate: boolean = false
let didInit: boolean = false

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
export async function setupAptPack(packages: AptPackage[], update = false): Promise<InstallationInfo> {
  const apt: string = getApt()

  for (const { name, version } of packages) {
    info(`Installing ${name} ${version ?? ""} via ${apt}`)
  }

  process.env.DEBIAN_FRONTEND = "noninteractive"

  // Update the repos if needed
  if (update) {
    updateRepos(apt)
    didUpdate = true
  }

  // Add the repos if needed
  await addRepositories(apt, packages)

  // Qualify the packages into full package name/version
  let qualifiedPacks = await Promise.all(packages.map((pack) => getAptArg(pack.name, pack.version)))

  // find the packages that are not installed
  qualifiedPacks = await Promise.all(qualifiedPacks.filter(async (pack) => !(await isPackageInstalled(pack))))

  if (qualifiedPacks.length === 0) {
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
    execRootSync(apt, ["install", "--fix-broken", "-y", ...qualifiedPacks])
  } catch (err) {
    if ("stderr" in (err as ExecaError)) {
      const stderr = (err as ExecaError).stderr
      if (retryErrors.some((error) => stderr.includes(error))) {
        warning(`Failed to install packages ${qualifiedPacks}. Retrying...`)
        execRootSync(apt, ["install", "--fix-broken", "-y", ...qualifiedPacks])
      }
    } else {
      throw err
    }
  }

  return { binDir: "/usr/bin/" }
}

export enum AptPackageType {
  NameDashVersion = 0,
  NameEqualsVersion = 1,
  Name = 2,
  None = 3,
}

async function addRepositories(apt: string, packages: AptPackage[]) {
  const allRepositories = [...new Set(packages.flatMap((pack) => pack.repositories ?? []))]
  if (allRepositories.length !== 0) {
    if (!didInit) {
      await initApt(apt)
      didInit = true
    }
    await installAddAptRepo()
    for (const repo of allRepositories) {
      // eslint-disable-next-line no-await-in-loop
      execRootSync("add-apt-repository", ["-y", repo])
    }
    updateRepos(apt)
    didUpdate = true
  }
}

export async function aptPackageType(name: string, version: string | undefined): Promise<AptPackageType> {
  if (version !== undefined && version !== "") {
    const { stdout } = await execa("apt-cache", [
      "search",
      "--names-only",
      `^${escapeRegex(name)}-${escapeRegex(version)}$`,
    ])
    if (stdout.trim() !== "") {
      return AptPackageType.NameDashVersion
    }

    try {
      // check if apt-get show can find the version
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { stdout } = await execa("apt-cache", ["show", `${name}=${version}`])
      if (stdout.trim() === "") {
        return AptPackageType.NameEqualsVersion
      }
    } catch {
      // ignore
    }
  }

  try {
    const { stdout: showStdout } = await execa("apt-cache", ["show", name])
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
    return aptPackageType(name, version)
  }

  return AptPackageType.None
}

async function getAptArg(name: string, version: string | undefined) {
  const package_type = await aptPackageType(name, version)
  switch (package_type) {
    case AptPackageType.NameDashVersion:
      return `${name}-${version}`
    case AptPackageType.NameEqualsVersion:
      return `${name}=${version}`
    case AptPackageType.Name:
      return name
    default:
      throw new Error(`Could not find package ${name} ${version ?? ""}`)
  }
}

export function hasNala() {
  return which.sync("nala", { nothrow: true }) !== null
}

function getApt() {
  let apt: string
  if (hasNala()) {
    apt = "nala"
  } else {
    apt = "apt-get"
  }
  return apt
}

function updateRepos(apt: string) {
  execRootSync(apt, apt !== "nala" ? ["update", "-y"] : ["update"])
}

async function installAddAptRepo() {
  if (await isPackageInstalled("software-properties-common")) {
    return
  }
  execRootSync("apt-get", ["install", "-y", "--fix-broken", "software-properties-common"])
}

/** Install gnupg and certificates (usually missing from docker containers) */
async function initApt(apt: string) {
  // Update the repos if needed
  if (!didUpdate) {
    updateRepos(apt)
    didUpdate = true
  }

  const toInstall = ["ca-certificates", "gnupg", "apt-utils"].filter(async (pack) => !(await isPackageInstalled(pack)))

  if (toInstall.length !== 0) {
    execRootSync(apt, ["install", "-y", "--fix-broken", ...toInstall])
  }

  const promises: Promise<string | void>[] = [
    addAptKeyViaServer(["3B4FE6ACC0B21F32", "40976EAF437D05B5"], "setup-cpp-ubuntu-archive.gpg"),
    addAptKeyViaServer(["1E9377A2BA9EF27F"], "launchpad-toolchain.gpg"),
  ]
  if (apt === "nala") {
    // enable utf8 otherwise it fails because of the usage of ASCII encoding
    promises.push(
      addEnv("LANG", "C.UTF-8", { shouldAddOnlyIfNotDefined: true }),
      addEnv("LC_ALL", "C.UTF-8", { shouldAddOnlyIfNotDefined: true }),
    )
  }
  await Promise.all(promises)
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
    await setupAptPack([{ name: "curl" }, { name: "ca-certificates" }], undefined)
    await execa("curl", ["-s", url, "-o", `/tmp/${name}`])
    execRootSync("gpg", ["--no-default-keyring", "--keyring", `gnupg-ring:${fileName}`, "--import", `/tmp/${name}`])
    execRootSync("chmod", ["644", fileName])
  }
  return fileName
}

export async function updateAptAlternatives(name: string, path: string, priority: number = 40) {
  if (GITHUB_ACTIONS) {
    await execRoot("update-alternatives", ["--install", `/usr/bin/${name}`, name, path, priority.toString()])
  } else {
    await sourceCpprc()
    await appendFile(
      cpprc_path,
      `\nif [ $UID -eq 0 ]; then update-alternatives --install /usr/bin/${name} ${name} ${path} ${priority}; fi\n`,
    )
  }
}

export async function isPackageInstalled(pack: string) {
  try {
    // check if a package is installed
    const { stdout } = await execa("dpkg", ["-s", pack])
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

export async function isPackageRegexInstalled(regexp: string) {
  try {
    // check if a package matching the regexp is installed
    const { stdout } = await execa("dpkg", ["-l", regexp])
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
