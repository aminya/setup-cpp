import { exec } from "@actions/exec"
import which from "which"

/** A function that installs a package using pip */
export async function setupPip(name: string, version?: string) {
  // check if it exists
  const pip = which.sync("pip3", { nothrow: true }) !== null ? "pip3" : "pip"

  const exit = await exec(pip, ["install", version !== undefined ? `${name}==${version}` : name])
  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }
}
