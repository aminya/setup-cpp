import { warning } from "ci-log"
import updateNotifier from "simple-update-notifier"
import packageJson from "../package-version.json"

// auto self update notifier
export async function checkUpdates() {
  try {
    await updateNotifier({ pkg: packageJson })
  } catch (err) {
    warning(`Failed to check for updates: ${err instanceof Error ? err.message + err.stack : err}`)
  }
}
