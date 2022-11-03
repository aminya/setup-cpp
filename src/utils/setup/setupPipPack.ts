/* eslint-disable require-atomic-updates */
import { getExecOutput } from "@actions/exec"
import execa from "execa"
import which from "which"
import { info } from "@actions/core"
import { addPath } from "../env/addEnv"
import { setupPython } from "../../python/python"
import { isBinUptoDate } from "./version"
import { join } from "patha"
import { getVersion } from "../../versions/versions"
import { InstallationInfo } from "./setupBin"
import { setupAptPack } from "./setupAptPack"
import { setupPacmanPack } from "./setupPacmanPack"
import { isArch } from "../env/isArch"
import { isUbuntu } from "../env/isUbuntu"
import { hasDnf } from "../env/hasDnf"
import { setupDnfPack } from "./setupDnfPack"

let python: string | undefined
let binDir: string | undefined

let tried = false

/** A function that installs a package using pip */
export async function setupPipPack(name: string, version?: string): Promise<InstallationInfo> {
  info(`Installing ${name} ${version ?? ""} via pip`)

  // setup python and pip if needed
  if (python === undefined) {
    if (which.sync("python3", { nothrow: true }) !== null) {
      python = "python3"
    } else if (which.sync("python", { nothrow: true }) !== null && (await isBinUptoDate("python", "3.0.0"))) {
      python = "python"
    } else {
      info("python3 was not found. Installing python")
      await setupPython(getVersion("python", undefined), "", process.arch)
      // try again
      if (tried) {
        throw new Error("Failed to install python")
      }
      tried = true
      return setupPipPack(name, version)
    }
    if (process.platform === "win32") {
      // downgrade pip on Windows
      // https://github.com/pypa/pip/issues/10875#issuecomment-1030293005
      execa.sync(python, ["-m", "pip", "install", "-U", "pip==21.3.1"], { stdio: "inherit" })
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
    execa.sync(python, ["-m", "pip", "install", "-U", "wheel"], { stdio: "inherit" })
  }

  execa.sync(python, ["-m", "pip", "install", version !== undefined && version !== "" ? `${name}==${version}` : name], {
    stdio: "inherit",
  })

  if (binDir === undefined) {
    if (process.platform === "linux") {
      binDir = "/home/runner/.local/bin/"
    } else if (process.platform === "darwin") {
      binDir = "/usr/local/bin/"
    } else {
      // windows or others
      try {
        binDir = join(
          (await getExecOutput(`${python} -c "import sys;print(sys.base_exec_prefix);"`)).stdout.trim(),
          "Scripts"
        )
      } catch {
        binDir = join(
          (await getExecOutput(`${python} -c "import sys;print(sys.base_exec_prefix);"`)).stdout.trim(),
          "Scripts"
        )
      }
    }
    info(`${binDir} to PATH`)
    await addPath(binDir)
  }

  return { binDir }
}
