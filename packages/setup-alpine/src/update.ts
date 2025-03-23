import { execRoot } from "admina"
import memoizee from "memoizee"

async function updateApk() {
  await execRoot("apk", ["update"], { stdio: "inherit" })
}
export const updateApkMemoized = memoizee(updateApk, { promise: true })
