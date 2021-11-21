import * as core from "@actions/core"
import { addPath } from "../utils/path/addPath"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import hasha from "hasha"
import { join } from "path"
import { isCI } from "../utils/env/isci"
import { setupActionsPython } from "./actions_python"

export function setupPython(version: string, setupDir: string, arch: string) {
  if (!isCI()) {
    // TODO parse versoin
    return setupPythonViaSystem("", setupDir, arch)
  }
  try {
    return setupActionsPython(version, setupDir, arch)
  } catch (err) {
    return setupPythonViaSystem(version, setupDir, arch)
  }
}

export async function setupPythonViaSystem(version: string, setupDir: string, arch: string) {
  switch (process.platform) {
    case "win32": {
      // Get an unique output directory name from the URL.
      const key: string = await hasha.async(version + arch, { algorithm: "md5" })
      const installDir = join(setupDir, key, "python")
      const binDir = installDir
      await setupChocoPack("python3", version, [`/InstallDir:${installDir}`])

      // Adding the bin dir to the path
      /** The directory which the tool is installed to */
      activateWinPython(binDir)

      return { installDir, binDir }
    }
    case "darwin": {
      return setupBrewPack("python3", version)
    }
    case "linux": {
      const installInfo = await setupAptPack("python3", version)
      await setupAptPack("python3-pip")
      return installInfo
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}

function activateWinPython(binDir: string) {
  core.info(`Add ${binDir} to PATH`)
  addPath(binDir)
}
