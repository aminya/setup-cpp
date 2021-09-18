/* eslint-disable require-atomic-updates */
import { InstallationInfo } from "./setupBin"
import { execaSudo } from "../env/sudo"

let didUpdate: boolean = false

/** A function that installs a package using apt */
export async function setupAptPack(
  name: string,
  version?: string,
  repository: boolean | string = true
): Promise<InstallationInfo> {
  const apt = "apt-get"

  if (typeof repository === "string") {
    await execaSudo("add-apt-repository", ["--update", "-y", repository])
  }

  if (!didUpdate || repository === true) {
    await execaSudo(apt, ["update", "-y"])
    didUpdate = true
  }

  if (version !== undefined && version !== "") {
    try {
      await execaSudo(apt, ["install", "-y", `${name}=${version}`])
    } catch {
      await execaSudo(apt, ["install", "-y", `${name}-${version}`])
    }
  } else {
    await execaSudo(apt, ["install", "-y", name])
  }

  return { binDir: "/usr/bin/" }
}
