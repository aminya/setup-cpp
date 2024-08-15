import { setupBrewPack } from "../utils/setup/setupBrewPack.js"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupSccache(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("sccache", version)
    }
    case "linux":
    case "darwin": {
      return setupBrewPack("sccache", version)
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
