import { setupPip } from "../utils/setup/setupPip"
import { addPath, startGroup, endGroup } from "@actions/core"

export async function setupGcovr(version?: string) {
  await setupPip("gcovr", version)

  if (process.platform === "linux") {
    try {
      startGroup(`Add /home/runner/.local/bin to PATH`)
      addPath("/home/runner/.local/bin/")
    } finally {
      endGroup()
    }
  }
}
