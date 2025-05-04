import { defaultExecOptions, execRootSync } from "admina"
import memoize from "memoizee"
import { getAptEnv } from "./apt-env.js"
import { aptTimeout } from "./apt-timeout.js"
import { getApt } from "./get-apt.js"
import { initAptMemoized } from "./init-apt.js"
import { isAptPackInstalled } from "./is-installed.js"
import { updateAptReposMemoized } from "./update.js"

function hasNoUpdateFlag_(apt: string) {
  const { stdout } = execRootSync("add-apt-repository", ["--help"], {
    ...defaultExecOptions,
    env: getAptEnv(apt),
    stdio: "pipe",
  })
  return stdout.includes("--no-update")
}
const hasNoUpdateFlag = memoize(hasNoUpdateFlag_)

export async function addAptRepository(repo: string, apt = getApt()) {
  await initAptMemoized(apt)
  await installAddAptRepo()
  execRootSync(
    "add-apt-repository",
    ["-y", hasNoUpdateFlag(apt) ? "--no-update" : undefined, repo].filter(a => a !== undefined),
    { ...defaultExecOptions, env: getAptEnv(apt) },
  )

  // Update the repos
  updateAptReposMemoized.clear() // ensure update is called
  updateAptReposMemoized(apt)
}

export async function installAddAptRepo() {
  if (await isAptPackInstalled("software-properties-common")) {
    return
  }
  const apt = "apt-get"
  execRootSync(
    apt,
    ["install", "-y", "--fix-broken", "-o", aptTimeout, "software-properties-common"],
    { ...defaultExecOptions, env: getAptEnv(apt) },
  )
}

export async function removeAptRepository(repo: string, apt = getApt()) {
  await initAptMemoized(apt)
  await installAddAptRepo()
  execRootSync(
    "add-apt-repository",
    ["-y", "--remove", hasNoUpdateFlag(apt) ? undefined : "--no-update", repo].filter(a => a !== undefined),
    { ...defaultExecOptions, env: getAptEnv(apt) },
  )

  // Update the repos
  updateAptReposMemoized.clear() // ensure update is called
  updateAptReposMemoized(apt)
}
