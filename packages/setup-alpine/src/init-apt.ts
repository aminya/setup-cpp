import { defaultExecOptions, execRootSync } from "admina"
import memoize from "memoizee"
import { filterAndQualifyApkPackages } from "./qualify-install.js"
import { updateApkMemoized } from "./update.js"

/** Install bash (usually missing from docker containers) */
export async function initApk() {
  // Update the repos
  await updateApkMemoized()

  const toInstall = await filterAndQualifyApkPackages([
    { name: "bash" },
  ])

  if (toInstall.length !== 0) {
    execRootSync("apk", ["add", ...toInstall], {
      ...defaultExecOptions,
    })
  }
}

/** Install bash (usually missing from docker containers) (memoized) */
export const initApkMemoized = memoize(initApk, { promise: true })
