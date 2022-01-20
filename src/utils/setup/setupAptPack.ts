/* eslint-disable require-atomic-updates */
import { InstallationInfo } from "./setupBin"
import { execaSudo } from "../env/sudo"

let didUpdate: boolean = false
let didInit: boolean = false

/** A function that installs a package using apt */
export async function setupAptPack(
  name: string,
  version?: string,
  repositories: boolean | string[] = true
): Promise<InstallationInfo> {
  const apt = "apt-get"

  process.env.DEBIAN_FRONTEND = "noninteractive"

  if (!didUpdate) {
    await execaSudo(apt, ["update", "-y"])
    didUpdate = true
  }

  if (!didInit) {
    // install apt utils and certificates (usually missing from docker containers)
    // set time - zone
    // TZ = Canada / Pacific
    // ln - snf / usr / share / zoneinfo / $TZ / etc / localtime && echo $TZ > /etc/timezone
    await execaSudo(apt, [
      "install",
      "--fix-broken",
      "-y",
      "software-properties-common",
      "apt-utils",
      "ca-certificates",
      "gnupg",
    ])
    didInit = true
  }

  if (Array.isArray(repositories)) {
    for (const repo of repositories) {
      // eslint-disable-next-line no-await-in-loop
      await execaSudo("add-apt-repository", ["--update", "-y", repo])
    }
    await execaSudo(apt, ["update", "-y"])
  }

  if (version !== undefined && version !== "") {
    try {
      await execaSudo(apt, ["install", "--fix-broken", "-y", `${name}=${version}`])
    } catch {
      await execaSudo(apt, ["install", "--fix-broken", "-y", `${name}-${version}`])
    }
  } else {
    await execaSudo(apt, ["install", "--fix-broken", "-y", name])
  }

  return { binDir: "/usr/bin/" }
}
