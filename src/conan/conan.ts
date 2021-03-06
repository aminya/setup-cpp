import { setupPipPack } from "../utils/setup/setupPipPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupConan(version: string | undefined, _setupDir: string, _arch: string) {
  await setupPipPack("setuptools", "")
  return setupPipPack("conan", version)
}
