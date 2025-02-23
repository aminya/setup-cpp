import { defaultExecOptions, execRootSync } from "admina"
import memoize from "memoizee"
import { getAptEnv } from "./apt-env.js"
import { aptTimeout } from "./apt-timeout.js"
import { getApt } from "./get-apt.js"

export let updatedRepos = false // eslint-disable-line import/no-mutable-exports

/**
 * Update the apt repositories
 * @param apt The apt command to use (optional)
 */
export function updateAptRepos(apt: string = getApt()) {
  execRootSync(
    apt,
    apt !== "nala" ? ["update", "-o", aptTimeout] : ["update", "-o", aptTimeout],
    { ...defaultExecOptions, env: getAptEnv(apt) },
  )

  updatedRepos = true
}

/**
 * Update the apt repositories (memoized)
 * @param apt The apt command to use (optional)
 */
export const updateAptReposMemoized = memoize(updateAptRepos)
