import type { SetupOptions } from "../setup-options.js"
import { setupPipPack } from "../utils/setup/setupPipPack.js"

export function setupConan({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
  return setupPipPack("conan", version)
}
