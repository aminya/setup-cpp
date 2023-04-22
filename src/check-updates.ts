import { warning } from "ci-log"
import { readFile } from "fs/promises"
import { join } from "path"

// auto self update notifier
export async function checkUpdates() {
  try {
    const updateNotifier = (await import("update-notifier")).default
    const packageJsonString = await readFile(join(__dirname, "..", "package.json"), "utf8")
    const packageJson = JSON.parse(packageJsonString)
    updateNotifier({ pkg: packageJson }).notify()
  } catch (err) {
    warning(`Failed to check for updates: ${err}`)
  }
}
