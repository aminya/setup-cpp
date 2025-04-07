import { pathExistsSync } from "path-exists"

/**
 * Check if the current platform is Alpine
 */
export function isAlpine() {
  if (process.platform !== "linux") {
    return false
  }
  try {
    return pathExistsSync("/etc/alpine-release")
  } catch {
    return false
  }
}
