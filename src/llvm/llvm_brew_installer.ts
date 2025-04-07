import { info } from "ci-log"
import { addPath } from "envosman"
import { installBrewPack } from "setup-brew"
import { rcOptions } from "../options.ts"
import { majorLLVMVersion } from "./utils.ts"

export async function trySetupLLVMBrew(version: string, _setupDir: string, _arch: string) {
  if (process.platform !== "darwin") {
    return Promise.resolve(undefined)
  }

  try {
    return await setupLLVMBrew(version, _setupDir, _arch)
  } catch (err) {
    info(`Failed to install llvm via brew: ${err}`)
    return undefined
  }
}

export async function setupLLVMBrew(version: string, _setupDir: string, _arch: string) {
  const majorVersion = majorLLVMVersion(version)

  // install llvm via brew if a bottle is available for it
  const installInfo = await installBrewPack("llvm", `${majorVersion}`, { "force-bottle": true })

  // add the bin directory to the PATH
  await addPath(installInfo.binDir, rcOptions)

  return installInfo
}
