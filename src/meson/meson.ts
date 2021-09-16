import { setupPipPack } from "../utils/setup/setupPipPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupMeson(version: string | undefined, _setupCppDir: string, _arch: string) {
  await setupPipPack("meson", version)
}
