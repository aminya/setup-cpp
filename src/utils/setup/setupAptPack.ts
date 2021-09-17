/* eslint-disable require-atomic-updates */
import spawn from "cross-spawn"
import { InstallationInfo } from "./setupBin"
import { mightSudo } from "./sudo"

let didUpdate: boolean = false

/** A function that installs a package using apt */
export function setupAptPack(name: string, version?: string, repository: boolean | string = true): InstallationInfo {
  const apt = mightSudo("apt-get")

  let exit: number | null = 0

  if (typeof repository === "string") {
    exit = spawn.sync(mightSudo("add-apt-repository"), ["--update", "-y", repository], { stdio: "inherit" }).status
  }

  if (!didUpdate || repository === true) {
    exit = spawn.sync(apt, ["update", "-y"], { stdio: "inherit" }).status
    didUpdate = true
  }

  if (version !== undefined && version !== "") {
    try {
      exit = spawn.sync(apt, ["install", "-y", `${name}=${version}`], { stdio: "inherit" }).status
    } catch {
      exit = spawn.sync(apt, ["install", "-y", `${name}-${version}`], { stdio: "inherit" }).status
    }
  } else {
    exit = spawn.sync(apt, ["install", "-y", name], { stdio: "inherit" }).status
  }

  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }

  return { binDir: "/usr/bin/" }
}
