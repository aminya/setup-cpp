import { warning } from "ci-log"
import { addPath } from "envosman"
import { installBrewPack } from "setup-brew"
import { rcOptions } from "../cli-options.ts"
import { majorLLVMVersion } from "./utils.ts"

export function trySetupLLVMBrew(version: string, _setupDir: string, _arch: string) {
  if (process.platform !== "darwin") {
    return Promise.resolve(undefined)
  }

  try {
    return setupLLVMBrew(version, _setupDir, _arch)
  } catch (err) {
    warning(`Failed to install llvm via brew: ${err}`)
    return undefined
  }
}

export async function setupLLVMBrew(version: string, _setupDir: string, _arch: string) {
  const majorVersion = majorLLVMVersion(version)
  const installInfo = await installBrewPack("llvm", `${majorVersion}`)

  // add the bin directory to the PATH
  await addPath(installInfo.binDir, rcOptions)

  return installInfo
}
