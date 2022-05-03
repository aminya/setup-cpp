import { addPath } from "../utils/env/addEnv"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { isGitHubCI } from "../utils/env/isci"
import { warning, info } from "../utils/io/io"

export async function setupPython(version: string, setupDir: string, arch: string) {
  if (!isGitHubCI()) {
    // TODO parse version
    return setupPythonViaSystem(version, setupDir, arch)
  }
  try {
    const { setupActionsPython } = await import("./actions_python")
    return setupActionsPython(version, setupDir, arch)
  } catch (err) {
    warning((err as Error).toString())
    return setupPythonViaSystem(version, setupDir, arch)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupPythonViaSystem(version: string, setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      if (setupDir) {
        setupChocoPack("python3", version, [`--params=/InstallDir:${setupDir}`])
      } else {
        setupChocoPack("python3", version)
      }

      // Adding the bin dir to the path
      /** The directory which the tool is installed to */
      activateWinPython(setupDir)
      return { installDir: setupDir, binDir: setupDir }
    }
    case "darwin": {
      return setupBrewPack("python3", version)
    }
    case "linux": {
      const installInfo = setupAptPack("python3", version)
      setupAptPack("python3-pip")
      return installInfo
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}

function activateWinPython(binDir: string) {
  info(`Add ${binDir} to PATH`)
  addPath(binDir)
}
