import memoizee from "memoizee"
import which from "which"

async function hasApk_() {
  try {
    await which("apk")
    return true
  } catch (error) {
    return false
  }
}
/**
 * Check if apk is available on the system
 */
export const hasApk = memoizee(hasApk_, { promise: true })
