import { execa } from "execa"
import memoizee from "memoizee"

async function updateApk() {
  await execa("apk", ["update"], { stdio: "inherit" })
}
export const updateApkMemoized = memoizee(updateApk, { promise: true })
