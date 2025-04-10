import type { SetupOptions } from "../setup-options.js"
import { setupPipPack } from "../utils/setup/setupPipPack.js"

export function setupMeson({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
  return setupPipPack("meson", version)
}
