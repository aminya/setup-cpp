import { getExecOutput } from "@actions/exec"
import * as core from "@actions/core"

export async function setupMacOSSDK() {
  if (process.platform === "darwin") {
    try {
      const xcrun = await getExecOutput("xcrun --sdk macosx --show-sdk-path")
      const sdkroot = xcrun.stdout || xcrun.stderr
      if (sdkroot) {
        core.exportVariable("SDKROOT", sdkroot.trim())
      } else {
        core.error(`SDKROOT not set`)
      }
    } catch (e) {
      core.error(e as Error | string)
    }
  }
}
