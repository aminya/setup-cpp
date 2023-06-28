/* eslint-disable require-atomic-updates */
import { addPath } from "../utils/env/addEnv"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { GITHUB_ACTIONS } from "ci-info"
import { warning, info } from "ci-log"
import { isArch } from "../utils/env/isArch"
import which from "which"
import { InstallationInfo } from "../utils/setup/setupBin"
import { dirname, join } from "patha"
import { hasDnf } from "../utils/env/hasDnf"
import { setupDnfPack } from "../utils/setup/setupDnfPack"
import { isUbuntu } from "../utils/env/isUbuntu"
import { getExecOutput } from "@actions/exec"
import { isBinUptoDate } from "../utils/setup/version"
import { execaSync } from "execa"
import { unique } from "../utils/std"
import { DefaultVersions } from "../versions/default_versions"
import assert from "assert"

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

  // add python bin paths to PATH
  const _execPaths = await addPythonBaseExecPrefix(foundPython)

  return installInfo
}

async function findOrSetupPython(version: string, setupDir: string, arch: string) {
  let installInfo: InstallationInfo | undefined
  let foundPython = await findPython()

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

        foundPython = (await findPython())!
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

  if (foundPython === undefined) {
    foundPython = (await findPython())!
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
      const pythonBinPath =
        which.sync("python3.exe", { nothrow: true }) ??
        which.sync("python.exe", { nothrow: true }) ??
        join(setupDir, "python.exe")
      const pythonSetupDir = dirname(pythonBinPath)
      /** The directory which the tool is installed to */
      await addPath(pythonSetupDir)
      installInfo = { installDir: pythonSetupDir, binDir: pythonSetupDir }
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

async function findPython() {
  if (which.sync("python3", { nothrow: true }) !== null) {
    return "python3"
  } else if (which.sync("python", { nothrow: true }) !== null && (await isBinUptoDate("python", "3.0.0"))) {
    return "python"
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
  for (const pip of ["pip3", "pip"]) {
    if (
      which.sync(pip, { nothrow: true }) !== null &&
      // eslint-disable-next-line no-await-in-loop
      (await isBinUptoDate(pip, DefaultVersions.pip!))
    ) {
      return pip
    }
  }
  return undefined
}

async function setupPip(foundPython: string) {
  const upgraded = ensurePipUpgrade(foundPython)
  if (!upgraded) {
    await setupPipSystem()
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

async function setupPipSystem() {
  if (process.platform === "linux") {
    // ensure that pip is installed on Linux (happens when python is found but pip not installed)
    if (isArch()) {
      await setupPacmanPack("python-pip")
    } else if (hasDnf()) {
      setupDnfPack("python3-pip")
    } else if (isUbuntu()) {
      await setupAptPack([{ name: "python3-pip" }])
    }
  }
  throw new Error(`Could not install pip on ${process.platform}`)
}

/** Install wheel (required for Conan, Meson, etc.) */
function setupWheel(foundPython: string) {
  execaSync(foundPython, ["-m", "pip", "install", "-U", "wheel"], { stdio: "inherit" })
}

export async function addPythonBaseExecPrefix(python: string) {
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
