/* eslint-disable require-atomic-updates */
import { InstallationInfo } from "./setupBin"
import { execSudo } from "../exec/sudo"
import { info } from "@actions/core"
import { warning } from "../io/io"
import { isGitHubCI } from "../env/isci"
import { cpprc_path, setupCppInProfile } from "../env/addEnv"
import { appendFileSync } from "fs"

let didUpdate: boolean = false
let didInit: boolean = false

/** A function that installs a package using apt */
export async function setupAptPack(
  name: string,
  version?: string,
  repositories: boolean | string[] = true
): Promise<InstallationInfo> {
  info(`Installing ${name} ${version ?? ""} via apt`)

  const apt = "apt-get"

  process.env.DEBIAN_FRONTEND = "noninteractive"

  if (!didUpdate) {
    await execSudo(apt, ["update", "-y"])
    didUpdate = true
  }

  if (!didInit) {
    // install apt utils and certificates (usually missing from docker containers)
    // set time - zone
    // TZ = Canada / Pacific
    // ln - snf / usr / share / zoneinfo / $TZ / etc / localtime && echo $TZ > /etc/timezone
    await execSudo(apt, [
      "install",
      "--fix-broken",
      "-y",
      "software-properties-common",
      "apt-utils",
      "ca-certificates",
      "gnupg",
    ])
    try {
      await execSudo("apt-key", ["adv", "--keyserver", "keyserver.ubuntu.com", "--recv-keys", "3B4FE6ACC0B21F32"])
      await execSudo("apt-key", ["adv", "--keyserver", "keyserver.ubuntu.com", "--recv-keys", "40976EAF437D05B5"])
      await execSudo("apt-key", ["adv", "--keyserver", "keyserver.ubuntu.com", "--recv-keys", "1E9377A2BA9EF27F"])
    } catch (err) {
      warning(`Failed to add keys: ${err}`)
    }
    didInit = true
  }

  if (Array.isArray(repositories)) {
    for (const repo of repositories) {
      // eslint-disable-next-line no-await-in-loop
      await execSudo("add-apt-repository", ["--update", "-y", repo])
    }
    await execSudo(apt, ["update", "-y"])
  }

  if (version !== undefined && version !== "") {
    try {
      await execSudo(apt, ["install", "--fix-broken", "-y", `${name}=${version}`])
    } catch {
      await execSudo(apt, ["install", "--fix-broken", "-y", `${name}-${version}`])
    }
  } else {
    await execSudo(apt, ["install", "--fix-broken", "-y", name])
  }

  return { binDir: "/usr/bin/" }
}

export function updateAptAlternatives(name: string, path: string) {
  if (isGitHubCI()) {
    return execSudo("update-alternatives", ["--install", `/usr/bin/${name}`, name, path, "40"])
  } else {
    setupCppInProfile()
    return appendFileSync(
      cpprc_path,
      `\nif [ $UID -eq 0 ]; then update-alternatives --install /usr/bin/${name} ${name} ${path} 40; fi\n`
    )
  }
}
