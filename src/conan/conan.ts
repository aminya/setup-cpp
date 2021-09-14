import { setupPip } from "../utils/setup/setupPip"

export async function setupConan(version?: string) {
  await setupPip("conan", version)
}
