import type { SetupOptions } from "../setup-options.js"
import { setupPipPack } from "../utils/setup/setupPipPack.js"

export function setupFlawfinder({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
  return setupPipPack("flawfinder", version)
}
