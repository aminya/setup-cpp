import { setupPipPack } from "../utils/setup/setupPipPack"

export async function setupMeson(version?: string) {
  await setupPipPack("meson", version)
}
