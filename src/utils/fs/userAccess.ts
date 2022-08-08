import { isSudo } from "root-tools"
import { execRootSync } from "root-tools"

/// change the owner to the SUDO_USER. This is required so the user can use the folder without sudo
export function folderUserAccess(folder: string) {
  if (
    (process.platform === "linux" || process.platform === "darwin") &&
    isSudo() &&
    process.env.SUDO_USER !== undefined
  ) {
    execRootSync("chown", ["-R", process.env.SUDO_USER, folder], { cwd: folder, stdio: "inherit", shell: true })
  }
}
