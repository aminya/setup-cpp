import { addPath } from "@actions/core"
import execa from "execa"
import path from "path"
import untildify from "untildify"
import which from "which"
import { addShellExtension } from "../utils/extension/extension"
import { InstallationInfo } from "../utils/setup/setupBin"

let hasVCPKG = false

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupVcpkg(_version: string, _setupCppDir: string, _arch: string): InstallationInfo {
  if (!hasVCPKG || which.sync("vcpkg", { nothrow: true }) === null) {
    execa.sync("git", ["clone", "https://github.com/microsoft/vcpkg"], { cwd: untildify("~/") })
    const vcpkgDir = untildify("~/vcpkg")
    execa.sync(addShellExtension("./vcpkg/bootstrap-vcpkg"), { cwd: vcpkgDir, shell: true })
    addPath(vcpkgDir)
    hasVCPKG = true
    return { binDir: vcpkgDir }
  }

  return { binDir: path.dirname(which.sync("vcpkg")) }
}
