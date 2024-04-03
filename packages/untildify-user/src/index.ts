import { isSudo } from "admina"
import { homedir } from "os"
import { join } from "path"

export function userHomeDir() {
  if (isSudo() && typeof process.env.SUDO_USER === "string" && process.env.SUDO_USER !== "") {
    // use the user profile even if root
    if (process.platform === "darwin") {
      return join("/Users/", process.env.SUDO_USER)
    } else {
      return join("/home/", process.env.SUDO_USER)
    }
  } else {
    const maybeHomeDir = homedir()
    if (maybeHomeDir === "") {
      return undefined
    }
    return maybeHomeDir
  }
}

const tildeRegex = /^~(?=$|\/|\\)/

/**
 * Replaces a tilde with the user's home directory
 *
 * @example UntildifyUser("~/foo") // /home/user/foo
 *
 * @param path The path to untildify
 * @returns The untildified path
 */
export function untildifyUser(path: string) {
  const maybeHomeDir = userHomeDir()
  if (maybeHomeDir === undefined) {
    return path
  }

  return path.replace(tildeRegex, maybeHomeDir)
}
