import { execa } from "execa"
import { getAptEnv } from "./apt-env.js"

/**
 * Check if a package is installed
 * @param pack The package to check
 * @returns `true` if the package is installed, `false` otherwise
 */
export async function isAptPackInstalled(pack: string) {
  try {
    // check if a package is installed
    const { stdout } = await execa("dpkg", ["-s", pack], { env: getAptEnv("apt-get"), stdio: "pipe" })
    if (typeof stdout !== "string") {
      return false
    }
    const lines = stdout.split("\n")
    // check if the output contains a line that starts with "Status: install ok installed"
    return lines.some((line) => line.startsWith("Status: install ok installed"))
  } catch {
    return false
  }
}

/**
 * Check if a package matching a regexp is installed
 * @param regexp The regexp to check
 * @returns `true` if a package is installed, `false` otherwise
 */
export async function isAptPackRegexInstalled(regexp: string) {
  try {
    // check if a package matching the regexp is installed
    const { stdout } = await execa("dpkg", ["-l", regexp], { env: getAptEnv("apt-get"), stdio: "pipe" })
    if (typeof stdout !== "string") {
      return false
    }
    const lines = stdout.split("\n")
    // check if the output contains any lines that start with "ii"
    return lines.some((line) => line.startsWith("ii"))
  } catch {
    return false
  }
}
