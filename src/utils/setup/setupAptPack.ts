import { exec } from "@actions/exec"

/** A function that installs a package using apt */
export async function setupAptPack(name: string, version?: string, updateRepositories: boolean = true) {
  if (updateRepositories) {
    await exec("apt-get", ["update"])
  }

  const exit = await exec("apt-get", ["install", version !== undefined ? `${name}=${version}` : name])

  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }
}
