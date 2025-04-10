import type { SetupOptions } from "../setup-options.js"
import { setupPipPack } from "../utils/setup/setupPipPack.js"

export function setupLizard({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
  return setupPipPack("lizard", version)
}
