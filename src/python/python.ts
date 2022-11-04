import { addPath } from "../utils/env/addEnv"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupPacmanPack } from "../utils/setup/setupPacmanPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import ciDetect from "@npmcli/ci-detect"
import { warning, info } from "ci-log"
import { isArch } from "../utils/env/isArch"
import which from "which"
import { InstallationInfo } from "../utils/setup/setupBin"
import { dirname, join } from "patha"
import { hasDnf } from "../utils/env/hasDnf"
import { setupDnfPack } from "../utils/setup/setupDnfPack"
import { isUbuntu } from "../utils/env/isUbuntu"
import { getExecOutput } from "@actions/exec"
import { existsSync } from "fs"
import { isBinUptoDate } from "../utils/setup/version"
import { getVersion } from "../versions/versions"
import assert from "assert"
import execa from "execa"

export async function setupPython(version: string, setupDir: string, arch: string) {
  if (ciDetect() !== "github-actions") {
    // TODO parse version
    return setupPythonViaSystem(version, setupDir, arch)
  }
  try {
    info("Installing python in GitHub Actions")
    const { setupActionsPython } = await import("./actions_python")
    return setupActionsPython(version, setupDir, arch)
  } catch (err) {
    warning((err as Error).toString())
    return setupPythonViaSystem(version, setupDir, arch)
  }
}

export async function setupPythonViaSystem(
  version: string,
  setupDir: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _arch: string
): Promise<InstallationInfo> {
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
      return { installDir: pythonSetupDir, binDir: pythonSetupDir }
    }
    case "darwin": {
      return setupBrewPack("python3", version)
    }
    case "linux": {
      let installInfo: InstallationInfo
      if (isArch()) {
        installInfo = setupPacmanPack("python", version)
        setupPacmanPack("python-pip")
      } else if (hasDnf()) {
        installInfo = setupDnfPack("python3", version)
        setupDnfPack("python3-pip")
      } else if (isUbuntu()) {
        installInfo = await setupAptPack("python3", version)
        await setupAptPack("python3-pip")
      } else {
        throw new Error(`Unsupported linux distributions`)
      }
      return installInfo
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}

let setupPythonAndPipTried = false

/// setup python and pip if needed
export async function setupPythonAndPip(): Promise<string> {
  let foundPython: string

  // install python
  if (which.sync("python3", { nothrow: true }) !== null) {
    foundPython = "python3"
  } else if (which.sync("python", { nothrow: true }) !== null && (await isBinUptoDate("python", "3.0.0"))) {
    foundPython = "python"
  } else {
    info("python3 was not found. Installing python")
    await setupPython(getVersion("python", undefined), "", process.arch)
    // try again
    if (setupPythonAndPipTried) {
      throw new Error("Failed to install python")
    }
    setupPythonAndPipTried = true
    return setupPythonAndPip() // recurse
  }

  assert(typeof foundPython === "string")

  // install pip
  if (process.platform === "win32") {
    // downgrade pip on Windows
    // https://github.com/pypa/pip/issues/10875#issuecomment-1030293005
    execa.sync(foundPython, ["-m", "pip", "install", "-U", "pip==21.3.1"], { stdio: "inherit" })
  } else if (process.platform === "linux") {
    // ensure that pip is installed on Linux (happens when python is found but pip not installed)
    if (isArch()) {
      setupPacmanPack("python-pip")
    } else if (hasDnf()) {
      setupDnfPack("python3-pip")
    } else if (isUbuntu()) {
      await setupAptPack("python3-pip")
    }
  }

  // install wheel (required for Conan, Meson, etc.)
  execa.sync(foundPython, ["-m", "pip", "install", "-U", "wheel"], { stdio: "inherit" })

  return foundPython
}

export async function addPythonBaseExecPrefix(python: string) {
  let dirs: string[] = []

  // detection based on the platform
  if (process.platform === "linux") {
    dirs.push("/home/runner/.local/bin/")
  } else if (process.platform === "darwin") {
    dirs.push("/usr/local/bin/")
  }

  // detection using python.sys
  const base_exec_prefix = (await getExecOutput(`${python} -c "import sys;print(sys.base_exec_prefix);"`)).stdout.trim()
  dirs.push(join(base_exec_prefix, "Scripts"), join(base_exec_prefix, "bin"))

  // exclude the non existing ones
  dirs = dirs.filter((dir) => existsSync(dir))

  // add the directories to the path
  await Promise.all(dirs.map((dir) => addPath(dir)))

  // the last directory is the bin directory (not empty)
  const foundBinDir = dirs.pop()

  if (foundBinDir === undefined) {
    warning("The binary directory for pip dependencies could not be found")
  }

  return foundBinDir!
}
