import { defaultExecOptions, execRootSync } from "admina"
import { getAptEnv } from "./apt-env.js"
import { aptTimeout } from "./apt-timeout.js"
import { getApt } from "./get-apt.js"

/**
 * Update the apt repositories
 * @param apt The apt command to use (optional)
 */
export function updateAptRepos(apt: string = getApt()) {
  execRootSync(
    apt,
    apt !== "nala" ? ["update", "-y", "-o", aptTimeout] : ["update", "-o", aptTimeout],
    { ...defaultExecOptions, env: getAptEnv(apt) },
  )
}
