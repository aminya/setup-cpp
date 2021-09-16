import { addPath } from "@actions/core"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

export async function setupOpencppcoverage(version?: string) {
  if (process.platform !== "win32") {
    return
  }
  await setupChocoPack("opencppcoverage", version)
  addPath("C:/Program Files/OpenCppCoverage")
}
