import { getInput } from "@actions/core"
import type { AddPathOptions } from "envosman"
import { untildifyUser } from "untildify-user"
import type { Inputs } from "./tool.ts"
import type { InstallationInfo } from "./utils/setup/setupBin.ts"

/**
 * The options for the setup-cpp function
 */
export type Opts = Record<Inputs, string | undefined> & {
  "setup-cpp"?: boolean
  timeout?: string
  "node-package-manager"?: string
}

/** Get an object from github actions */
export function maybeGetInput(key: string) {
  const value = getInput(key.toLowerCase())
  if (value !== "false" && value !== "") {
    return value
  }
  return undefined // skip installation
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

export const rcOptions: AddPathOptions = {
  rcPath: untildifyUser("~/.cpprc"),
  guard: "cpp",
}
