/* eslint-disable require-atomic-updates */
import { exec } from "@actions/exec"
import { InstallationInfo } from "./setupBin"
import { mightSudo } from "./sudo"

let didUpdate: boolean = false

/** A function that installs a package using apt */
export async function setupAptPack(
  name: string,
  version?: string,
  repository: boolean | string = true
): Promise<InstallationInfo> {
  const apt = mightSudo("apt-get")

  let exit: number | null = 0

  if (typeof repository === "string") {
    exit = await exec(mightSudo("add-apt-repository"), ["--update", "-y", repository])
  }

  if (!didUpdate || repository === true) {
    exit = await exec(apt, ["update", "-y"])
    didUpdate = true
  }

  if (version !== undefined && version !== "") {
    try {
      exit = await exec(apt, ["install", "-y", `${name}=${version}`])
    } catch {
      exit = await exec(apt, ["install", "-y", `${name}-${version}`])
    }
  } else {
    exit = await exec(apt, ["install", "-y", name])
  }

  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }

  return { binDir: "/usr/bin/" }
}
