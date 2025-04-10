import { addPath } from "envosman"
import { rcOptions } from "../options.js"
import type { SetupOptions } from "../setup-options.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"

export async function setupOpencppcoverage({ version }: SetupOptions) {
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
