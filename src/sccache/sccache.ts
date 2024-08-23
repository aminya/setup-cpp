import { installBrewPack } from "setup-brew"
import { setupChocoPack } from "../utils/setup/setupChocoPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupSccache(version: string, _setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      return setupChocoPack("sccache", version)
    }
    case "linux":
    case "darwin": {
      return installBrewPack("sccache", version)
    }
    default: {
      throw new Error("Unsupported platform")
    }
  }
}
