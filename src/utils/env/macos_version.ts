import macosRelease from "macos-release"
import memoize from "micro-memoize"

/**
 * Get macOS version
 *
 * @returns {number[]} - The macOS version as an array of numbers
 */
function macosVersion_raw() {
  const { version } = macosRelease()
  return version.split(".").map((v) => parseInt(v, 10))
}
export const macosVersion = memoize(macosVersion_raw)
