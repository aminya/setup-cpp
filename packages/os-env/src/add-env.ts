import { promises } from "fs"
import { exportVariable as ghExportVariable } from "@actions/core"
import { GITHUB_ACTIONS } from "ci-info"
import { error, info } from "ci-log"
import { execPowershell } from "exec-powershell"
import { defaultRcPath, sourceRCInRc } from "./rc-file.js"
import { escapeString } from "./utils.js"
const { appendFile } = promises

/**
 * The options for adding an environment variable
 */
export type AddEnvOptions = {
  /** If true, the value will be escaped with quotes and spaces will be escaped with backslash */
  escapeSpace: boolean
  /** If false, the variable will be only added if it is not already defined (Default to true) */
  overwrite: boolean
  /**
   * The path to the RC file that the env variables should be added to.
   */
  rcPath: string
  /** Provide a name (your tool) to add a variable guard for sourcing your rc file */
  guard?: string
}
/**
 * Add an environment variable.
 *
 * This function is cross-platforms and works in all the local or CI systems.
 */

export async function addEnv(
  name: string,
  valGiven: string | undefined,
  givenOptions: Partial<AddEnvOptions> = {},
) {
  const options = {
    escapeSpace: false,
    overwrite: true,
    rcPath: defaultRcPath,
    ...givenOptions,
  }

  const val = escapeString(valGiven ?? "", options.escapeSpace)
  try {
    if (GITHUB_ACTIONS) {
      try {
        if (!options.overwrite) {
          if (process.env[name] !== undefined) {
            info(`Environment variable ${name} is already defined. Skipping.`)
            return
          }
        }
        ghExportVariable(name, val)
      } catch (err) {
        error(err as Error)
        await addEnvSystem(name, val, options)
      }
    } else {
      await addEnvSystem(name, val, options)
    }
  } catch (err) {
    error(`${err}\nFailed to export environment variable ${name}=${val}. You should add it manually.`)
  }
}

async function addEnvSystem(name: string, valGiven: string | undefined, options: AddEnvOptions) {
  const val = valGiven ?? ""
  switch (process.platform) {
    case "win32": {
      if (!options.overwrite) {
        if (process.env[name] !== undefined) {
          info(`Environment variable ${name} is already defined. Skipping.`)
          return
        }
      }
      // We do not use `execaSync(`setx PATH "${path};%PATH%"`)` because of its character limit
      await execPowershell(`[Environment]::SetEnvironmentVariable('${name}', '${val}', "User")`)
      info(`${name}='${val}' was set in the environment.`)
      return
    }
    case "linux":
    case "darwin": {
      await sourceRCInRc(options)
      if (!options.overwrite) {
        await appendFile(options.rcPath, `\nif [ -z "\${${name}}" ]; then export ${name}="${val}"; fi\n`)
        info(`if not defined ${name} then ${name}="${val}" was added to "${options.rcPath}`)
      } else {
        await appendFile(options.rcPath, `\nexport ${name}="${val}"\n`)
        info(`${name}="${val}" was added to "${options.rcPath}`)
      }
      return
    }
    default: {
      // fall through shell path modification
    }
  }
  process.env[name] = val
}
