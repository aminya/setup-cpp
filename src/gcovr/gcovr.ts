import { setupPip } from "../utils/setup/setupPip"

export async function setupGcovr(version?: string) {
  await setupPip("gcovr", version)
}
