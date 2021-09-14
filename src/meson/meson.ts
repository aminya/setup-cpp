import { setupPip } from "../utils/setup/setupPip"

export async function setupMeson(version?: string) {
  await setupPip("meson", version)
}
