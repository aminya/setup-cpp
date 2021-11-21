import { setupPipPack } from "../utils/setup/setupPipPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupGcovr(version: string | undefined, _setupDir: string, _arch: string) {
  return setupPipPack("gcovr", version)
}
