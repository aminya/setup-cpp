import { getExecOutput } from "@actions/exec"
import { error } from "ci-log"
import { addEnv } from "../utils/env/addEnv"

export async function setupMacOSSDK() {
  if (process.platform === "darwin") {
    try {
      const xcrun = await getExecOutput("xcrun --sdk macosx --show-sdk-path")
      const sdkroot = xcrun.stdout || xcrun.stderr
      if (sdkroot) {
        await addEnv("SDKROOT", sdkroot.trim())
      } else {
        error(`SDKROOT not set`)
      }
    } catch (e) {
      error(e as Error | string)
    }
  }
}
