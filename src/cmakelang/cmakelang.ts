import type { SetupOptions } from "../setup-options.js"
import { setupPipPack } from "../utils/setup/setupPipPack.js"

export function setupCmakelang({ version }: SetupOptions) {
  return setupPipPack("cmakelang[YAML]", version)
}
