import { join } from "path"
import { endGroup, startGroup } from "@actions/core"
import { error } from "ci-log"
import { setupBrew } from "setup-brew"
import { rcOptions } from "./options.js"
import { type ToolName, llvmTools, setups } from "./tool.js"
import type { InstallationInfo } from "./utils/setup/setupBin.js"
import { setupVCVarsall } from "./vcvarsall/vcvarsall.js"
import { getVersion } from "./versions/versions.js"

export const DEFAULT_TIMEOUT = 60 * 60 * 1000 // 60 minutes

export async function installTool(
  tool: ToolName,
  version: string,
  osVersion: number[] | null,
  arch: string,
  setupCppDir: string,
  successMessages: string[],
  errorMessages: string[],
  _timeout: number = DEFAULT_TIMEOUT, // TODO: pass to execa
) {
  startGroup(`Installing ${tool} ${version}`)
  try {
    await installToolImpl(tool, version, osVersion, arch, setupCppDir, successMessages)
  } catch (e) {
    // push error message to the logger
    error(e as string | Error)
    if (e instanceof Error && e.stack !== undefined) {
      error(e.stack)
    }
    errorMessages.push(`${tool} failed to install`)
  }
  endGroup()
}

async function installToolImpl(
  tool: ToolName,
  version: string,
  osVersion: number[] | null,
  arch: string,
  setupCppDir: string,
  successMessages: string[],
) {
  const hasLLVM = llvmTools.includes(tool)

  let installationInfo: InstallationInfo | undefined | void
  if (tool === "vcvarsall") {
    // eslint-disable-next-line no-await-in-loop
    await setupVCVarsall({ version: getVersion(tool, version, osVersion), arch, uwp: false, spectre: false })
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
    installationInfo = await setupFunction({ version: setupVersion, setupDir, arch })
  }
  // preparing a report string
  successMessages.push(getSuccessMessage(tool, installationInfo))
}

export function getSuccessMessage(tool: string, installationInfo: InstallationInfo | undefined | void) {
  let msg = `✅ ${tool} was installed successfully:`
  if (installationInfo === undefined) {
    return msg
  }
  if ("installDir" in installationInfo) {
    msg += `\n- The installation directory is ${installationInfo.installDir}`
  }
  if (installationInfo.binDir !== "") {
    msg += `\n- The binary directory is ${installationInfo.binDir}`
  }
  return msg
}
