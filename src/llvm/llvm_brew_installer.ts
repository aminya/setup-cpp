import { warning } from "ci-log"
import { installBrewPack } from "setup-brew"
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

export function setupLLVMBrew(version: string, _setupDir: string, _arch: string) {
  const majorVersion = majorLLVMVersion(version)
  return installBrewPack("llvm", `${majorVersion}`)
}
