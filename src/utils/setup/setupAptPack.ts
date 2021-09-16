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

  let exit = 0

  if (typeof repository === "string") {
    exit = await exec(mightSudo("add-apt-repository"), ["--update", repository])
  }

  if (!didUpdate || repository === true) {
    await exec(apt, ["update"])
    didUpdate = true
  }

  if (version !== undefined && version !== "") {
    try {
      exit = await exec(apt, ["install", `${name}=${version}`])
    } catch {
      exit = await exec(apt, ["install", `${name}-${version}`])
    }
  } else {
    exit = await exec(apt, ["install", name])
  }

  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }

  return { binDir: "/usr/bin/" }
}
