import { defaultExecOptions, execRootSync } from "admina"
import { info, warning } from "ci-log"
import type { ExecaError } from "execa"
import { getAptEnv } from "./apt-env.js"
import { type AddAptKeyOptions, addAptKey } from "./apt-key.js"
import { addAptRepository } from "./apt-repository.js"
import { aptTimeout } from "./apt-timeout.js"
import { getApt } from "./get-apt.js"
import { initApt } from "./init-apt.js"
import { filterAndQualifyAptPackages } from "./qualify-install.js"
import { updateAptRepos } from "./update.js"

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
export let didUpdate: boolean = false
let didInit: boolean = false

/**
 * The information about an apt package
 */
export type AptPackage = {
  /** The name of the package */
  name: string
  /** The version of the package (optional) */
  version?: string
  /** The repository to add before installing the package (optional) */
  repository?: string
  /** The key to add before installing the package (optional) */
  key?: AddAptKeyOptions
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
 *
 * @returns The installation information
 *
 * @example
 * ```ts
 * await installAptPack([{ name: "ca-certificates" }, { name: "gnupg" }])
 * ```
 *
 * @example
 * ```ts
  await installAptPack([
    {
      name: "gcc",
      version,
      repository: "ppa:ubuntu-toolchain-r/test",
      key: { key: "1E9377A2BA9EF27F", fileName: "ubuntu-toolchain-r-test.gpg" },
    },
  ])
 * ```
 */
export async function installAptPack(packages: AptPackage[], update = false): Promise<InstallationInfo> {
  const apt: string = getApt()

  for (const { name, version } of packages) {
    info(`Installing ${name} ${version ?? ""} via ${apt}`)
  }

  // Update the repos if needed
  if (update) {
    updateAptRepos(apt)
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

  try {
    // Add the keys if needed
    await addAptKeys(packages)

    // Install
    execRootSync(apt, ["install", "--fix-broken", "-y", ...needToInstall], {
      ...defaultExecOptions,
      env: getAptEnv(apt),
    })
  } catch (err) {
    if (isExecaError(err)) {
      if (retryErrors.some((error) => err.stderr.includes(error))) {
        warning(`Failed to install packages ${needToInstall}. Retrying...`)
        execRootSync(
          apt,
          ["install", "--fix-broken", "-y", "-o", aptTimeout, ...needToInstall],
          { ...defaultExecOptions, env: getAptEnv(apt) },
        )
      }
    } else {
      throw err
    }
  }

  return { binDir: "/usr/bin/" }
}

async function addRepositories(apt: string, packages: AptPackage[]) {
  const allRepositories = [...new Set(packages.flatMap((pack) => pack.repository ?? []))]
  await Promise.all(allRepositories.map((repo) => addAptRepository(repo, apt)))
}

async function addAptKeys(packages: AptPackage[]) {
  await Promise.all(packages.map(async (pack) => {
    if (pack.key !== undefined) {
      await addAptKey(pack.key)
    }
  }))
}

function isExecaError(err: unknown): err is ExecaError {
  return typeof (err as ExecaError).stderr === "string"
}
