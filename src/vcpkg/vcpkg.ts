import { addPath, warning } from "@actions/core"
import * as execa from "execa"
import { existsSync } from "fs"
import { dirname, join } from "path"
import which from "which"
import { addShellExtension, addShellHere } from "../utils/extension/extension"
import { InstallationInfo } from "../utils/setup/setupBin"

let hasVCPKG = false

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupVcpkg(_version: string, setupDir: string, _arch: string): InstallationInfo {
  if (!hasVCPKG || which.sync("vcpkg", { nothrow: true }) === null) {
    if (!existsSync(join(setupDir, addShellExtension("bootstrap-vcpkg")))) {
      execa.execaSync("git", ["clone", "https://github.com/microsoft/vcpkg"], { cwd: dirname(setupDir) })
    } else {
      warning(`Vcpkg folder already exists at ${setupDir}`)
    }
    execa.execaSync(addShellExtension(addShellHere("bootstrap-vcpkg")), { cwd: setupDir, shell: true })
    addPath(setupDir)
    hasVCPKG = true
    return { binDir: setupDir }
  }

  return { binDir: dirname(which.sync("vcpkg")) }
}
