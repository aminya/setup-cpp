import type { SetupOptions } from "../setup-options.js"
import { setupPipPack } from "../utils/setup/setupPipPack.js"

export function setupConan({ version }: SetupOptions) {
  return setupPipPack("conan", version)
}
