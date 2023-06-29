/* eslint-disable require-atomic-updates */
import { getExecOutput } from "@actions/exec"
import assert from "assert"
import { GITHUB_ACTIONS } from "ci-info"
import { info, warning } from "ci-log"
import { execaSync } from "execa"
import memoize from "micro-memoize"
import { addExeExt, dirname, join } from "patha"
import which from "which"
import { addPath } from "../utils/env/addEnv"
import { hasDnf } from "../utils/env/hasDnf"
import { isArch } from "../utils/env/isArch"
import { isUbuntu } from "../utils/env/isUbuntu"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { InstallationInfo } from "../utils/setup/setupBin"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { setupDnfPack } from "../utils/setup/setupDnfPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"
import { isBinUptoDate } from "../utils/setup/version"
import { unique } from "../utils/std"
import { MinVersions } from "../versions/default_versions"
import { pathExists } from "path-exists"

export async function setupPython(version: string, setupDir: string, arch: string): Promise<InstallationInfo> {
  const installInfo = await findOrSetupPython(version, setupDir, arch)
  assert(installInfo.bin !== undefined)
  const foundPython = installInfo.bin

  // setup pip
  const foundPip = await findOrSetupPip(foundPython)
  if (foundPip === undefined) {
    throw new Error("pip was not installed correctly")
  }

  // setup wheel
  try {
    setupWheel(foundPython)
  } catch (err) {
    warning(`Failed to install wheels: ${(err as Error).toString()}. Ignoring...`)
  }

  return installInfo
}

async function findOrSetupPython(version: string, setupDir: string, arch: string) {
  let installInfo: InstallationInfo | undefined
  let foundPython = await findPython(setupDir)

  if (foundPython !== undefined) {
    const binDir = dirname(foundPython)
    installInfo = { bin: foundPython, installDir: binDir, binDir }
  } else {
    // if python is not found, try to install it
    if (GITHUB_ACTIONS) {
      // install python in GitHub Actions
      try {
        info("Installing python in GitHub Actions")
        const { setupActionsPython } = await import("./actions_python")
        await setupActionsPython(version, setupDir, arch)

        foundPython = (await findPython(setupDir))!
        const binDir = dirname(foundPython)
        installInfo = { bin: foundPython, installDir: binDir, binDir }
      } catch (err) {
        warning((err as Error).toString())
      }
    }
    if (installInfo === undefined) {
      // install python via system package manager
      installInfo = await setupPythonSystem(setupDir, version)
    }
  }

  if (foundPython === undefined || installInfo.bin === undefined) {
    foundPython = (await findPython(setupDir))!
    installInfo.bin = foundPython
  }

  return installInfo
}

async function setupPythonSystem(setupDir: string, version: string) {
  let installInfo: InstallationInfo | undefined
  switch (process.platform) {
    case "win32": {
      if (setupDir) {
        await setupChocoPack("python3", version, [`--params=/InstallDir:${setupDir}`])
      } else {
        await setupChocoPack("python3", version)
      }
      // Adding the bin dir to the path
      const bin = (await findPython(setupDir))!
      const binDir = dirname(bin)
      /** The directory which the tool is installed to */
      await addPath(binDir)
      installInfo = { installDir: binDir, binDir, bin }
      break
    }
    case "darwin": {
      installInfo = await setupBrewPack("python3", version)
      break
    }
    case "linux": {
      if (isArch()) {
        installInfo = await setupPacmanPack("python", version)
      } else if (hasDnf()) {
        installInfo = setupDnfPack("python3", version)
      } else if (isUbuntu()) {
        installInfo = await setupAptPack([{ name: "python3", version }])
      } else {
        throw new Error("Unsupported linux distributions")
      }
      break
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
  return installInfo
}

async function findPython(binDir?: string) {
  const foundBins = (
    await Promise.all(["python3", "python"].map((pythonBin) => isPythonUpToDate(pythonBin, binDir)))
  ).filter((bin) => bin !== undefined) as string[]

  if (foundBins.length === 0) {
    return undefined
  }

  return foundBins[0]
}

async function isPythonUpToDate(candidate: string, binDir?: string) {
  try {
    if (binDir !== undefined) {
      const pythonBinPath = join(binDir, addExeExt(candidate))
      if (await pathExists(pythonBinPath)) {
        if (await isBinUptoDate(pythonBinPath, MinVersions.python!)) {
          return pythonBinPath
        }
      }
    }
    const pythonBinPath: string | null = await which(candidate, { nothrow: true })
    if (pythonBinPath !== null && (await isBinUptoDate(pythonBinPath, MinVersions.python!))) {
      return pythonBinPath
    }
  } catch {
    // fall through
  }
  return undefined
}

async function findOrSetupPip(foundPython: string) {
  const maybePip = await findPip()

  if (maybePip === undefined) {
    // install pip if not installed
    info("pip was not found. Installing pip")
    await setupPip(foundPython)
    return findPip() // recurse to check if pip is on PATH and up-to-date
  }

  return maybePip
}

async function findPip() {
  const foundBins = (await Promise.all(["pip3", "pip"].map(isPipUptoDate))).filter(
    (bin) => bin !== undefined
  ) as string[]

  if (foundBins.length === 0) {
    return undefined
  }

  return foundBins[0]
}

async function isPipUptoDate(pip: string) {
  try {
    const pipPath: string | null = await which(pip, { nothrow: true })
    if (pipPath !== null && (await isBinUptoDate(pipPath, MinVersions.pip!))) {
      return pipPath
    }
  } catch {
    // fall through
  }
  return undefined
}

async function setupPip(foundPython: string) {
  const upgraded = ensurePipUpgrade(foundPython)
  if (!upgraded) {
    await setupPipSystem()
    // upgrade pip
    ensurePipUpgrade(foundPython)
  }
}

function ensurePipUpgrade(foundPython: string) {
  try {
    execaSync(foundPython, ["-m", "ensurepip", "-U", "--upgrade"], { stdio: "inherit" })
    return true
  } catch (err1) {
    info((err1 as Error)?.toString?.())
    try {
      // ensure pip is disabled on Ubuntu
      execaSync(foundPython, ["-m", "pip", "install", "--upgrade", "pip"], { stdio: "inherit" })
      return true
    } catch (err2) {
      info((err2 as Error)?.toString?.())
      // pip module not found
    }
  }
  // all methods failed
  return false
}

function setupPipSystem() {
  if (process.platform === "linux") {
    // ensure that pip is installed on Linux (happens when python is found but pip not installed)
    if (isArch()) {
      return setupPacmanPack("python-pip")
    } else if (hasDnf()) {
      return setupDnfPack("python3-pip")
    } else if (isUbuntu()) {
      return setupAptPack([{ name: "python3-pip" }])
    }
  }
  throw new Error(`Could not install pip on ${process.platform}`)
}

/** Install wheel (required for Conan, Meson, etc.) */
function setupWheel(foundPython: string) {
  execaSync(foundPython, ["-m", "pip", "install", "-U", "wheel"], { stdio: "inherit" })
}

async function addPythonBaseExecPrefix_raw(python: string) {
  const dirs: string[] = []

  // detection based on the platform
  if (process.platform === "linux") {
    dirs.push("/home/runner/.local/bin/")
  } else if (process.platform === "darwin") {
    dirs.push("/usr/local/bin/")
  }

  // detection using python.sys
  const base_exec_prefix = (await getExecOutput(`${python} -c "import sys;print(sys.base_exec_prefix);"`)).stdout.trim()
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
export const addPythonBaseExecPrefix = memoize(addPythonBaseExecPrefix_raw)
