import { isSudo, execRootSync } from "root-tools"

/**
 * Give the user access to the given path and its sub-directories. It changes the owner to the SUDO_USER. This allows
 * the user to use the folder without sudo
 *
 * @param path The path to give the user access to
 */
export function giveUserAccess(path: string) {
  if (
    (process.platform === "linux" || process.platform === "darwin") &&
    isSudo() &&
    process.env.SUDO_USER !== undefined
  ) {
    execRootSync("chown", ["-R", process.env.SUDO_USER, path], { cwd: path, stdio: "inherit", shell: true })
  }
}
