import { defaultExecOptions, execRootSync } from "admina"
import memoize from "memoizee"
import { getAptEnv } from "./apt-env.js"
import { aptTimeout } from "./apt-timeout.js"
import { filterAndQualifyAptPackages } from "./qualify-install.js"
import { updateAptReposMemoized } from "./update.js"

/** Install gnupg and certificates (usually missing from docker containers) */
export async function initApt(apt: string) {
  // Update the repos
  updateAptReposMemoized(apt)

  const toInstall = await filterAndQualifyAptPackages([
    { name: "ca-certificates" },
    { name: "gnupg" },
    { name: "apt-utils" },
  ], apt)

  if (toInstall.length !== 0) {
    execRootSync(apt, ["install", "-y", "--fix-broken", "-o", aptTimeout, ...toInstall], {
      ...defaultExecOptions,
      env: getAptEnv(apt),
    })
  }
}

/** Install gnupg and certificates (usually missing from docker containers) (memoized) */
export const initAptMemoized = memoize(initApt, { promise: true })
