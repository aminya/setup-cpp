/* eslint-disable require-atomic-updates */
import execa from "execa"
import { InstallationInfo } from "./setupBin"
// import { mightSudo } from "./sudo"

let didUpdate: boolean = false

/** A function that installs a package using apt */
export async function setupAptPack(
  name: string,
  version?: string,
  repository: boolean | string = true
): Promise<InstallationInfo> {
  const apt = "apt-get" // mightSudo

  if (typeof repository === "string") {
    await execa("add-apt-repository", ["--update", "-y", repository])
  }

  if (!didUpdate || repository === true) {
    await execa(apt, ["update", "-y"])
    didUpdate = true
  }

  if (version !== undefined && version !== "") {
    try {
      await execa(apt, ["install", "-y", `${name}=${version}`])
    } catch {
      await execa(apt, ["install", "-y", `${name}-${version}`])
    }
  } else {
    await execa(apt, ["install", "-y", name])
  }

  return { binDir: "/usr/bin/" }
}
