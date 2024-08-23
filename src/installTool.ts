import { endGroup, startGroup } from "@actions/core"
import { error } from "ci-log"
import pTimeout from "p-timeout"
import { join } from "patha"
import { setupBrew } from "setup-brew"
import { getSuccessMessage, rcOptions } from "./cli-options.js"
import { type ToolName, setups } from "./tool.js"
import type { InstallationInfo } from "./utils/setup/setupBin.js"
import { setupVCVarsall } from "./vcvarsall/vcvarsall.js"
import { getVersion } from "./versions/versions.js"

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
    hasLLVM = await pTimeout(installToolImpl(tool, version, osVersion, arch, setupCppDir, successMessages), {
      milliseconds: timeout,
      message: `Timeout while installing ${tool} ${version}. You can increase the timeout from options`,
    })
  } catch (e) {
    // push error message to the logger
    error(e as string | Error)
    if (e instanceof Error && e.stack !== undefined) {
      error(e.stack)
    }
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
  setupCppDir: string,
  successMessages: string[],
) {
  // eslint-disable-next-line no-param-reassign
  const hasLLVM = ["llvm", "clangformat", "clangtidy"].includes(tool)

  let installationInfo: InstallationInfo | undefined | void
  if (tool === "vcvarsall") {
    // eslint-disable-next-line no-await-in-loop
    await setupVCVarsall(getVersion(tool, version, osVersion), undefined, arch, undefined, undefined, false, false)
  } else if (tool === "brew") {
    // eslint-disable no-await-in-loop
    installationInfo = await setupBrew({ rcOptions })
  } else {
    // the tool installation directory (for the functions that ue it)
    const setupDir = join(setupCppDir, hasLLVM ? "llvm" : tool)

    const setupVersion = getVersion(tool, version, osVersion)

    // get the setup function
    const setupFunction = setups[tool]

    // eslint-disable no-await-in-loop
    installationInfo = await setupFunction(setupVersion, setupDir, arch)
  }
  // preparing a report string
  successMessages.push(getSuccessMessage(tool, installationInfo))
  return hasLLVM
}
