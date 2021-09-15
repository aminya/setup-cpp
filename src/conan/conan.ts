import { setupPipPack } from "../utils/setup/setupPipPack"

export async function setupConan(version?: string) {
  await setupPipPack("conan", version)
}
