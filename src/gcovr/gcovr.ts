import { setupPipPack } from "../utils/setup/setupPipPack"

export async function setupGcovr(version?: string) {
  await setupPipPack("gcovr", version)
}
