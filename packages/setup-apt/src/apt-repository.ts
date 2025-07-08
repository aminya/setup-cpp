import { defaultExecOptions, execRootSync } from "admina"
import memoize from "memoizee"
import { getAptEnv } from "./apt-env.js"
import { aptTimeout } from "./apt-timeout.js"
import { getApt } from "./get-apt.js"
import { initAptMemoized } from "./init-apt.js"
import { isAptPackInstalled } from "./is-installed.js"
import { updateAptReposMemoized } from "./update.js"

function hasNoUpdateFlag_(apt: string = "apt-get") {
  try {
    const { stdout } = execRootSync("add-apt-repository", ["--help"], {
      ...defaultExecOptions,
      env: getAptEnv(apt),
      stdio: "pipe",
    })
    return stdout.includes("--no-update")
  } catch (err) {
    return false
  }
}
export const addAptHasNoUpdateFlag = memoize(hasNoUpdateFlag_)

export async function addAptRepository(repo: string, apt = getApt()) {
  await initAptMemoized(apt)
  await installAddAptRepo()

  try {
    execRootSync(
      "add-apt-repository",
      ["-y", addAptHasNoUpdateFlag(apt) ? "--no-update" : undefined, repo].filter(a => a !== undefined),
      { ...defaultExecOptions, env: getAptEnv(apt) },
    )
  } catch (err) {
    // try without the no-update flag
    execRootSync(
      "add-apt-repository",
      ["-y", repo],
      { ...defaultExecOptions, env: getAptEnv(apt) },
    )
  }

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
    ["-y", "--remove", addAptHasNoUpdateFlag(apt) ? undefined : "--no-update", repo].filter(a => a !== undefined),
    { ...defaultExecOptions, env: getAptEnv(apt) },
  )

  // Update the repos
  updateAptReposMemoized.clear() // ensure update is called
  updateAptReposMemoized(apt)
}
