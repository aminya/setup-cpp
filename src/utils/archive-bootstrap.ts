import { untildifyUser } from "untildify-user"
import { maybeGetInput } from "../actions-input.js"
import type { SetupOptions } from "../setup-options.js"

export function getLegacyArchiveSetupOptions() {
  return {
    setupSevenZip: { version: "" },
    setupTar: {
      version: "",
      arch: process.arch,
      setupDir: untildifyUser("~/tar"),
    } satisfies SetupOptions,
  }
}

export function shouldCacheTools() {
  return maybeGetInput("cache-tools") === "true" || process.env.CACHE_TOOLS === "true"
}
