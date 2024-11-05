import { setupPipPack } from "../utils/setup/setupPipPack.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupCpplint(version: string | undefined, _setupDir: string, _arch: string) {
  return setupPipPack("cpplint", version, {
    pythonVersion: ">=3.8.0",
  })
}
