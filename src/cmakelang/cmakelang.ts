import type { SetupOptions } from "../setup-options.js"
import { setupPipPack } from "../utils/setup/setupPipPack.js"

export function setupCmakelang({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
  return setupPipPack("cmakelang[YAML]", version)
}
