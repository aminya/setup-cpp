import { setupPipPack } from "../utils/setup/setupPipPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupLizard(version: string | undefined, _setupDir: string, _arch: string) {
  return setupPipPack("lizard", version)
}
