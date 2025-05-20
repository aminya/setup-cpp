import { dirname, join } from "path"
import { info } from "@actions/core"
import { getExecOutput } from "@actions/exec"
import { warning } from "ci-log"
import { addPath } from "envosman"
import { execa, execaSync } from "execa"
import memoize from "memoizee"
import { mkdirp } from "mkdirp"
import { pathExists } from "path-exists"
import { addExeExt } from "patha"
import { hasApk, installApkPack } from "setup-alpine"
import { hasAptGet, installAptPack } from "setup-apt"
import { installBrewPack } from "setup-brew"
import { untildifyUser } from "untildify-user"
import which from "which"
import { rcOptions } from "../../options.js"
import { setupPython } from "../../python/python.js"
import { getVersion } from "../../versions/versions.js"
import { hasDnf } from "../env/hasDnf.js"
import { isArch } from "../env/isArch.js"
import { ubuntuVersion } from "../env/ubuntu_version.js"
import { unique } from "../std/index.js"
import type { InstallationInfo } from "./setupBin.js"
import { setupDnfPack } from "./setupDnfPack.js"
import { setupPacmanPack } from "./setupPacmanPack.js"
import { getBinVersion } from "./version.js"

export type SetupPipPackOptions = {
  /** Whether to use pipx instead of pip */
  usePipx?: boolean
  /** Whether to install the package as a user */
  user?: boolean
  /** Whether to upgrade the package */
  upgrade?: boolean
  /** Whether the package is a library */
  isLibrary?: boolean
  /** python version (e.g. >=3.8.0) */
  pythonVersion?: string
}

/** A function that installs a package using pip */
export async function setupPipPack(
  name: string,
  version?: string,
  options: SetupPipPackOptions = {},
): Promise<InstallationInfo> {
  return setupPipPackWithPython(await getPython(options.pythonVersion), name, version, options)
}

export async function setupPipPackWithPython(
  givenPython: string,
  name: string,
  version?: string,
  options: SetupPipPackOptions = {},
): Promise<InstallationInfo> {
  const { usePipx: givenUsePipx = true, user = true, upgrade = false, isLibrary = false } = options

  const usePipx = givenUsePipx && !isLibrary && (await hasPipxModule(givenPython))

  // if the package is externally managed, let the system tools handle it
  const externallyManaged = !usePipx && (await isExternallyManaged(givenPython))

  const pip = usePipx ? "pipx" : "pip"

  // remove `[]` extensions
  const nameOnly = getPackageName(name)

  // if upgrade is not requested, check if the package is already installed, and return if it is
  if (!upgrade) {
    const installed = usePipx
      ? await pipxPackageInstalled(givenPython, nameOnly)
      : await pipPackageIsInstalled(givenPython, nameOnly)
    if (installed) {
      const binDir = usePipx
        ? await finishPipxPackageInstall()
        : await finishPipPackageInstall(givenPython, nameOnly)
      return { binDir }
    }
  }

  if (!externallyManaged && await pipHasPackage(givenPython, nameOnly)) {
    try {
      info(`Installing ${name} ${version ?? ""} via ${pip}`)

      const nameAndVersion = version !== undefined && version !== "" ? `${name}==${version}` : name
      const upgradeFlag = upgrade ? (usePipx ? ["upgrade"] : ["install", "--upgrade"]) : ["install"]
      const userFlag = !usePipx && user ? ["--user"] : []

      const env = process.env

      if (usePipx && user) {
        // install to user home
        env.PIPX_HOME = await getPipxHome()
        env.PIPX_BIN_DIR = await getPipxBinDir()
      }

      execaSync(givenPython, ["-m", pip, ...upgradeFlag, ...userFlag, nameAndVersion], {
        stdio: "inherit",
        env,
      })
    } catch (err) {
      const msg = err instanceof Error ? `${err.message}\n${err.stack}` : String(err)
      info(`Failed to install ${name} via ${pip}: ${msg}`)
      if ((await setupPipPackSystem(name)) === null) {
        throw new Error(`Failed to install ${name} via ${pip}: ${err}.`)
      }
    }
  } else if ((await setupPipPackSystem(name)) === null) {
    throw new Error(`Failed to install ${name} as it was not found via ${pip} or the system package manager`)
  }

  const binDir = usePipx
    ? await finishPipxPackageInstall()
    : await finishPipPackageInstall(givenPython, nameOnly)
  return { binDir }
}

function finishPipxPackageInstall() {
  return getPipxBinDir()
}

async function finishPipPackageInstall(givenPython: string, name: string) {
  const pythonBaseExecPrefix = await addPythonBaseExecPrefix(givenPython)
  const binDir = await findBinDir(pythonBaseExecPrefix, name)
  await addPath(binDir, rcOptions)
  return binDir
}

export async function hasPipxBinary() {
  return (await which("pipx", { nothrow: true })) !== null
}

export async function hasPipxModule(givenPython: string) {
  const res = await execa(givenPython, ["-m", "pipx", "--help"], { stdio: "ignore", reject: false })
  return res.exitCode === 0
}

async function getPipxHome_() {
  let pipxHome = process.env.PIPX_HOME
  if (pipxHome !== undefined) {
    return pipxHome
  }

  // Based on https://pipx.pypa.io/stable/installation/
  const compatHome = untildifyUser("~/.local/pipx")
  if (await pathExists(compatHome)) {
    return compatHome
  }

  switch (process.platform) {
    case "win32": {
      pipxHome = untildifyUser("~/AppData/Local/pipx")
      break
    }
    case "darwin": {
      pipxHome = untildifyUser("~/Library/Application Support/pipx")
      break
    }
    default: {
      pipxHome = untildifyUser("~/.local/share/pipx")
      break
    }
  }

  await mkdirp(pipxHome)
  await mkdirp(join(pipxHome, "trash"))
  await mkdirp(join(pipxHome, "shared"))
  await mkdirp(join(pipxHome, "venv"))
  return pipxHome
}
const getPipxHome = memoize(getPipxHome_, { promise: true })

async function getPipxBinDir_() {
  if (process.env.PIPX_BIN_DIR !== undefined) {
    return process.env.PIPX_BIN_DIR
  }

  const pipxBinDir = untildifyUser("~/.local/bin")
  await addPath(pipxBinDir, rcOptions)
  await mkdirp(pipxBinDir)
  return pipxBinDir
}
const getPipxBinDir = memoize(getPipxBinDir_, { promise: true })

/* eslint-disable require-atomic-updates */
let pythonBin: string | undefined

async function getPython(givenPythonVersion?: string): Promise<string> {
  if (pythonBin !== undefined) {
    return pythonBin
  }

  const pythonVersion = givenPythonVersion
    ?? getVersion("python", undefined, await ubuntuVersion())

  pythonBin = (await setupPython(pythonVersion, "", process.arch)).bin
  return pythonBin
}

/**
 * Get the actual name of a pip package from the given string
 * @param pkg the given name that might contain extensions in `[]`.
 * @returns stirped down name of the package
 */
function getPackageName(pkg: string) {
  return pkg.replace(/\[.*]/g, "").trim()
}

async function pipPackageIsInstalled(python: string, name: string) {
  try {
    const result = await execa(python, ["-m", "pip", "-qq", "show", name], {
      stdio: "ignore",
      reject: false,
    })
    return result.exitCode === 0
  } catch {
    return false
  }
}

type PipxShowType = {
  venvs: Record<string, {
    metadata: {
      main_package: {
        package: string
        package_or_url: string
        apps: string[]
      }
    }
  }>
}

async function pipxPackageInstalled(python: string, name: string) {
  try {
    const result = await execa(python, ["-m", "pipx", "list", "--json"], {
      stdio: "ignore",
      reject: false,
    })
    if (result.exitCode !== 0 || typeof result.stdout !== "string") {
      return false
    }

    const pipxOut = JSON.parse(result.stdout) as PipxShowType
    // search among the venvs
    if (name in pipxOut.venvs) {
      return true
    }
    // search among the urls
    for (const venv of Object.values(pipxOut.venvs)) {
      if (venv.metadata.main_package.package_or_url === name || venv.metadata.main_package.package === name) {
        return true
      }
    }
  } catch {
    // ignore
  }
  return false
}

async function pipHasPackage(python: string, name: string) {
  const result = await execa(python, ["-m", "pip", "-qq", "index", "versions", name], {
    stdio: "ignore",
    reject: false,
  })
  return result.exitCode === 0
}

async function findBinDir(dirs: string[], name: string) {
  const exists = await Promise.all(dirs.map((dir) => pathExists(join(dir, addExeExt(name)))))
  const dirIndex = exists.findIndex((exist) => exist)
  if (dirIndex !== -1) {
    const foundDir = dirs[dirIndex]
    return foundDir
  }

  const whichDir = which.sync(addExeExt(name), { nothrow: true })
  if (whichDir !== null) {
    return dirname(whichDir)
  }

  return dirs[dirs.length - 1]
}

export async function setupPipPackSystem(name: string, givenAddPythonPrefix?: boolean) {
  if (process.platform === "linux") {
    info(`Installing ${name} via the system package manager`)

    const addPythonPrefix = name === "pipx" ? isArch() : (givenAddPythonPrefix ?? true)

    if (isArch()) {
      return setupPacmanPack(addPythonPrefix ? `python-${name}` : name)
    } else if (hasDnf()) {
      return setupDnfPack([{ name: addPythonPrefix ? `python3-${name}` : name }])
    } else if (hasAptGet()) {
      return installAptPack([{ name: addPythonPrefix ? `python3-${name}` : name }])
    } else if (await hasApk()) {
      return installApkPack([{ name: addPythonPrefix ? `py3-${name}` : name }])
    }
  } else if (process.platform === "darwin") {
    // brew doesn't have venv
    if (["venv"].includes(name)) {
      return null
    }

    return installBrewPack(name)
  }
  return null
}

async function addPythonBaseExecPrefix_(python: string) {
  const dirs: string[] = []

  // detection based on the platform
  if (process.platform === "linux") {
    dirs.push("/home/runner/.local/bin/")
  } else if (process.platform === "darwin") {
    dirs.push("/usr/local/bin/")
  }

  // detection using python.sys
  const base_exec_prefix = await getPythonBaseExecPrefix(python)
  // any of these are possible depending on the operating system!
  dirs.push(join(base_exec_prefix, "Scripts"), join(base_exec_prefix, "Scripts", "bin"), join(base_exec_prefix, "bin"))

  // remove duplicates
  return unique(dirs)
}

/**
 * Add the base exec prefix to the PATH. This is required for Conan, Meson, etc. to work properly.
 *
 * The answer is cached for subsequent calls
 */
export const addPythonBaseExecPrefix = memoize(addPythonBaseExecPrefix_, { promise: true })

async function getPythonBaseExecPrefix_(python: string) {
  return (await getExecOutput(`${python} -c "import sys;print(sys.base_exec_prefix);"`)).stdout.trim()
}
/**
 * Get the base exec prefix of a Python installation
 * This is the directory where the Python interpreter is installed
 * and where the standard library is located
 */
export const getPythonBaseExecPrefix = memoize(getPythonBaseExecPrefix_, { promise: true })

async function isExternallyManaged_(python: string) {
  try {
    const base_exec_prefix = await getPythonBaseExecPrefix(python)

    const pythonVersion = await getBinVersion(python)
    if (pythonVersion === undefined) {
      warning(`Failed to get the version of ${python}`)
      return false
    }

    const externallyManagedPath = join(
      base_exec_prefix,
      "lib",
      `python${pythonVersion.major}.${pythonVersion.minor}`,
      "EXTERNALLY-MANAGED",
    )
    return pathExists(externallyManagedPath)
  } catch (err) {
    warning(`Failed to check if ${python} is externally managed: ${err}`)
    return false
  }
}

/**
 * Check if the given Python installation is externally managed
 * This is required for Conan, Meson, etc. to work properly
 *
 * The answer is cached for subsequent calls
 */
export const isExternallyManaged = memoize(isExternallyManaged_, { promise: true })
