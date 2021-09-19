import { addPath } from "../utils/path/addPath"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupOpencppcoverage(version: string | undefined, _setupCppDir: string, _arch: string) {
  if (process.platform !== "win32") {
    return
  }
  await setupChocoPack("opencppcoverage", version)
  const binDir = "C:/Program Files/OpenCppCoverage"
  addPath(binDir)
  return { binDir }
}
