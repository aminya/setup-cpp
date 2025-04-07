import memoizee from "memoizee"
import which from "which"
import { isAlpine } from "./is-alpine.js"

async function hasApk_() {
  if (!isAlpine()) {
    return false
  }
  try {
    await which("apk")
    return true
  } catch {
    return false
  }
}
/**
 * Check if apk is available on the system
 */
export const hasApk = memoizee(hasApk_, { promise: true })
