import { warning } from "ci-log"
import { promises } from "fs"
const { readFile } = promises
import { join } from "path"

// auto self update notifier
export async function checkUpdates() {
  try {
    const { UpdateNotifier } = await import("update-notifier")
    const packageJsonString = await readFile(join(__dirname, "..", "package.json"), "utf8")
    const packageJson = JSON.parse(packageJsonString)
    new UpdateNotifier({ pkg: packageJson }).notify()
  } catch (err) {
    warning(`Failed to check for updates: ${err}`)
  }
}
