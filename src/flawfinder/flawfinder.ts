import type { SetupOptions } from "../setup-options.js"
import { setupPipPack } from "../utils/setup/setupPipPack.js"

export function setupFlawfinder({ version }: SetupOptions) {
  return setupPipPack("flawfinder", version)
}
