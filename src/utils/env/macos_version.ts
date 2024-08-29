import macosRelease from "macos-release"
import memoize from "memoizee"

/**
 * Get macOS version
 *
 * @returns {number[]} - The macOS version as an array of numbers
 */
function macosVersion_raw() {
  if (process.platform !== "darwin") {
    return []
  }

  const { version } = macosRelease()
  return version.split(".").map((v) => Number.parseInt(v, 10))
}
export const macosVersion = memoize(macosVersion_raw)
