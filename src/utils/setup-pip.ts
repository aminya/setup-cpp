import {
  type SetupPipPackDependencies,
  type SetupPipPackOptions,
  setupPipPack as setupPipPackPackage,
} from "setup-pip"
import { rcOptions } from "../options.js"
import { setupPython } from "../python/python.js"
import { getVersion } from "../versions/versions.js"
import { ubuntuVersion } from "./env/ubuntu_version.js"

export type { SetupPipPackDependencies, SetupPipPackOptions } from "setup-pip"

export function setupPipPack(
  name: string,
  version?: string,
  options: SetupPipPackOptions = {},
) {
  const dependencies: SetupPipPackDependencies = {
    rcOptions,
    getPython: async (givenPythonVersion) => {
      const pythonVersion = givenPythonVersion ?? getVersion("python", undefined, await ubuntuVersion())
      const python = await setupPython({ version: pythonVersion, setupDir: "", arch: process.arch })
      return python.bin
    },
  }

  return setupPipPackPackage(name, version, options, dependencies)
}
