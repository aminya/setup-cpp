import { InstallationInfo } from "./setupBin"
import { execRoot, execRootSync } from "admina"
import { GITHUB_ACTIONS } from "ci-info"
import { addEnv, cpprc_path, setupCppInProfile } from "../env/addEnv"
import { pathExists } from "path-exists"
import { promises as fsPromises } from "fs"
const { appendFile } = fsPromises
import { execa } from "execa"
import escapeRegex from "escape-string-regexp"
import { warning, info } from "ci-log"
import which from "which"

/* eslint-disable require-atomic-updates */
let didUpdate: boolean = false
let didInit: boolean = false

export type AptPackage = {
  name: string
  version?: string
  repositories?: string[]
}

/** A function that installs a package using apt */
export async function setupAptPack(packages: AptPackage[], update = false): Promise<InstallationInfo> {
  const apt: string = getApt()

  for (const { name, version } of packages) {
    info(`Installing ${name} ${version ?? ""} via ${apt}`)
  }

  process.env.DEBIAN_FRONTEND = "noninteractive"

  if (!didUpdate || update) {
    updateRepos(apt)
    didUpdate = true
  }

  if (!didInit) {
    await initApt(apt)
    didInit = true
  }

  const allRepositories = [...new Set(packages.flatMap((pack) => pack.repositories ?? []))]

  if (allRepositories.length !== 0) {
    for (const repo of allRepositories) {
      // eslint-disable-next-line no-await-in-loop
      execRootSync("add-apt-repository", ["-y", repo])
    }

    updateRepos(apt)
  }

  const aptArgs = await Promise.all(packages.map((pack) => getAptArg(pack.name, pack.version)))
  execRootSync(apt, ["install", "--fix-broken", "-y", ...aptArgs])

  return { binDir: "/usr/bin/" }
}

async function getAptArg(name: string, version: string | undefined) {
  if (version !== undefined && version !== "") {
    const { stdout } = await execa("apt-cache", [
      "search",
      "--names-only",
      `^${escapeRegex(name)}-${escapeRegex(version)}$`,
    ])
    if (stdout.trim() !== "") {
      return `${name}-${version}`
    } else {
      try {
        // check if apt-get show can find the version
        const { stdout: showStdout } = await execa("apt-cache", ["show", `${name}=${version}`])
        if (showStdout.trim() === "") {
          return `${name}=${version}`
        }
      } catch {
        // ignore
      }
      warning(`Failed to install ${name} ${version} via apt, trying without version`)
    }
  }
  return name
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

/** Install apt utils and certificates (usually missing from docker containers) */
async function initApt(apt: string) {
  execRootSync(apt, [
    "install",
    "--fix-broken",
    "-y",
    "software-properties-common",
    "apt-utils",
    "ca-certificates",
    "gnupg",
  ])
  const promises: Promise<string | void>[] = [
    addAptKeyViaServer(["3B4FE6ACC0B21F32", "40976EAF437D05B5"], "setup-cpp-ubuntu-archive.gpg"),
    addAptKeyViaServer(["1E9377A2BA9EF27F"], "launchpad-toolchain.gpg"),
  ]
  if (apt === "nala") {
    // enable utf8 otherwise it fails because of the usage of ASCII encoding
    promises.push(
      addEnv("LANG", "C.UTF-8", { shouldAddOnlyIfNotDefined: true }),
      addEnv("LC_ALL", "C.UTF-8", { shouldAddOnlyIfNotDefined: true })
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
        })
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

export async function updateAptAlternatives(name: string, path: string) {
  if (GITHUB_ACTIONS) {
    return execRoot("update-alternatives", ["--install", `/usr/bin/${name}`, name, path, "40"])
  } else {
    await setupCppInProfile()
    return appendFile(
      cpprc_path,
      `\nif [ $UID -eq 0 ]; then update-alternatives --install /usr/bin/${name} ${name} ${path} 40; fi\n`
    )
  }
}
