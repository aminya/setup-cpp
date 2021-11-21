import { getExecOutput } from "@actions/exec"
import { existsSync } from "fs"
import * as core from "@actions/core"

export async function setupMacOSSDK() {
  if (process.platform === "darwin") {
    try {
      const xcrun = await getExecOutput("xcrun --sdk macosx --show-sdk-path")
      const sdkroot = xcrun.stdout || xcrun.stderr
      if (existsSync(sdkroot)) {
        core.exportVariable("SDKROOT", sdkroot)
      }
    } catch (e) {
      core.error(e as Error | string)
    }
  }
}
