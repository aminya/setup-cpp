import { endGroup, startGroup } from "@actions/core"
import { error } from "ci-log"
import { join } from "patha"
import { getSuccessMessage } from "./cli-options"
import { InstallationInfo } from "./utils/setup/setupBin"
import { setupVCVarsall } from "./vcvarsall/vcvarsall"
import { getVersion } from "./versions/versions"
import pTimeout from "p-timeout"
import { ToolName, setups } from "./tool"

export const DEFAULT_TIMEOUT = 20 * 60 * 1000 // 20 minutes

export async function installTool(
  tool: ToolName,
  version: string,
  osVersion: number[] | null,
  arch: string,
  setupCppDir: string,
  successMessages: string[],
  errorMessages: string[],
  timeout: number = DEFAULT_TIMEOUT,
) {
  startGroup(`Installing ${tool} ${version}`)
  let hasLLVM = false
  try {
    hasLLVM = await pTimeout(installToolImpl(tool, version, osVersion, arch, hasLLVM, setupCppDir, successMessages), {
      milliseconds: timeout * 60 * 1000,
    })
  } catch (e) {
    // push error message to the logger
    error(e as string | Error)
    errorMessages.push(`${tool} failed to install`)
  }
  endGroup()
  return hasLLVM
}

async function installToolImpl(
  tool: ToolName,
  version: string,
  osVersion: number[] | null,
  arch: string,
  hasLLVM: boolean,
  setupCppDir: string,
  successMessages: string[],
) {
  let installationInfo: InstallationInfo | undefined | void
  if (tool === "vcvarsall") {
    // eslint-disable-next-line no-await-in-loop
    await setupVCVarsall(getVersion(tool, version, osVersion), undefined, arch, undefined, undefined, false, false)
  } else {
    // get the setup function
    const setupFunction = setups[tool]

    // eslint-disable-next-line no-param-reassign
    hasLLVM = ["llvm", "clangformat", "clangtidy"].includes(tool)

    // the tool installation directory (for the functions that ue it)
    const setupDir = join(setupCppDir, hasLLVM ? "llvm" : tool)

    // eslint-disable-next-line no-await-in-loop
    installationInfo = await setupFunction(getVersion(tool, version, osVersion), setupDir, arch)
  }
  // preparing a report string
  successMessages.push(getSuccessMessage(tool, installationInfo))
  return hasLLVM
}
