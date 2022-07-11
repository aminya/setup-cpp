import { isRoot } from "../env/sudo"
import { execSudo } from "../exec/sudo"

/// change the owner to the SUDO_USER. This is required so the user can use the folder without sudo
export function folderUserAccess(folder: string) {
  if (
    (process.platform === "linux" || process.platform === "darwin") &&
    isRoot() &&
    process.env.SUDO_USER !== undefined
  ) {
    execSudo("chown", ["-R", process.env.SUDO_USER, folder], folder)
  }
}
