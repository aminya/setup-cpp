import { defaultExecOptions, execRootSync } from "admina"
import { getAptEnv } from "./apt-env.js"
import { aptTimeout } from "./apt-timeout.js"
import { filterAndQualifyAptPackages } from "./qualify-install.js"
import { updateAptRepos } from "./update.js"

/** Install gnupg and certificates (usually missing from docker containers) */
export async function initApt(apt: string) {
  // Update the repos
  updateAptRepos(apt)

  const toInstall = await filterAndQualifyAptPackages(apt, [
    { name: "ca-certificates" },
    { name: "gnupg" },
    { name: "apt-utils" },
  ])

  if (toInstall.length !== 0) {
    execRootSync(apt, ["install", "-y", "--fix-broken", "-o", aptTimeout, ...toInstall], {
      ...defaultExecOptions,
      env: getAptEnv(apt),
    })
  }
}
