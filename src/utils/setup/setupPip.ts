import { exec } from "@actions/exec"

/** A function that installs a package using pip */
export async function setupPip(name: string, version?: string) {
  // pip3 install conan --upgrade

  const exit = await exec("pip", ["install", "--user", version !== undefined ? `${name}==${version}` : name])
  if (exit !== 0) {
    throw new Error(`Failed to install ${name} ${version}`)
  }
}
