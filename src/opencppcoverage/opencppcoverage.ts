import { addPath } from "envosman"
import { rcOptions } from "../cli-options.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupOpencppcoverage(version: string | undefined, _setupDir: string, _arch: string) {
  if (process.platform !== "win32") {
    return
  }
  await setupChocoPack("opencppcoverage", version)
  const binDir = await activateOpencppcoverage()
  return { binDir }
}

async function activateOpencppcoverage() {
  const binDir = "C:/Program Files/OpenCppCoverage"
  await addPath(binDir, rcOptions)
  return binDir
}
