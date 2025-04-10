import type { SetupOptions } from "../setup-options.js"
import { setupPipPack } from "../utils/setup/setupPipPack.js"

export function setupCpplint({ version }: SetupOptions) {
  return setupPipPack("cpplint", version, {
    pythonVersion: ">=3.8.0",
  })
}
