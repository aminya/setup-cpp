import { addPath } from "@actions/core"
import execa from "execa"
import path, { dirname } from "path"
import which from "which"
import { addShellExtension, addShellHere } from "../utils/extension/extension"
import { InstallationInfo } from "../utils/setup/setupBin"

let hasVCPKG = false

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupVcpkg(_version: string, setupDir: string, _arch: string): InstallationInfo {
  if (!hasVCPKG || which.sync("vcpkg", { nothrow: true }) === null) {
    execa.sync("git", ["clone", "https://github.com/microsoft/vcpkg"], { cwd: dirname(setupDir) })
    execa.sync(addShellExtension(addShellHere("bootstrap-vcpkg")), { cwd: setupDir, shell: true })
    addPath(setupDir)
    hasVCPKG = true
    return { binDir: setupDir }
  }

  return { binDir: path.dirname(which.sync("vcpkg")) }
}
