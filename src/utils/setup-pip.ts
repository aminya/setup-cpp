import {
  type SetupPipPackDependencies,
  type SetupPipPackOptions,
  setupPipPack as setupPipPackPackage,
} from "setup-pip"
import { rcOptions } from "../options.js"
import { setupPython } from "../python/python.js"
import type { SetupOptions } from "../setup-options.js"
import { getVersion } from "../versions/versions.js"
import { ubuntuVersion } from "./env/ubuntu_version.js"

export type { SetupPipPackDependencies, SetupPipPackOptions } from "setup-pip"

type PythonSetup = (options: SetupOptions) => Promise<{ bin: string }>
type DefaultPythonVersion = () => Promise<string>

export function createPythonResolver(
  setupPythonFn: PythonSetup = setupPython,
  getDefaultPythonVersion: DefaultPythonVersion = async () => getVersion("python", undefined, await ubuntuVersion()),
) {
  /* eslint-disable require-atomic-updates */
  let pythonBin: string | undefined

  return async (givenPythonVersion?: string): Promise<string> => {
    if (pythonBin !== undefined) {
      return pythonBin
    }

    const pythonVersion = givenPythonVersion ?? await getDefaultPythonVersion()
    pythonBin = (await setupPythonFn({ version: pythonVersion, setupDir: "", arch: process.arch })).bin
    return pythonBin
  }
  /* eslint-enable require-atomic-updates */
}

const getPython = createPythonResolver()

export function setupPipPack(
  name: string,
  version?: string,
  options: SetupPipPackOptions = {},
) {
  const dependencies: SetupPipPackDependencies = {
    rcOptions,
    getPython,
  }

  return setupPipPackPackage(name, version, options, dependencies)
}
