import { warning } from "ci-log"
import { promises } from "fs"
const { readFile } = promises
import { join } from "path"
import { isInstalled } from "./utils/std/resolve"

// auto self update notifier
export async function checkUpdates() {
  try {
    if (await isInstalled("update-notifier")) {
      const [un, packageJsonString] = await Promise.all([
        import("update-notifier"),
        readFile(join(__dirname, "..", "package.json"), "utf8"),
      ])

      const packageJson = JSON.parse(packageJsonString)

      // the types do not match the actual export
      const updateNotifier = un as unknown as (typeof un)["default"]

      updateNotifier({ pkg: packageJson }).notify()
    } else {
      warning("setup-cpp could not find its dependency update-notifier, skipping check for updates")
    }
  } catch (err) {
    warning(`Failed to check for updates: ${err instanceof Error ? err.message + err.stack : err}`)
  }
}
