import { exportVariable, addPath as ghAddPath, info } from "@actions/core"
import { isGitHubCI } from "./isci"
import { untildify_user as untildify } from "../path/untildify"
import { appendFileSync } from "fs"
import { error } from "../io/io"
import { execPowershell } from "../exec/powershell"
import { delimiter } from "path"

/** An add path function that works locally or inside GitHub Actions */
export function addEnv(name: string, val: string | undefined) {
  try {
    if (isGitHubCI()) {
      exportVariable(name, val)
    } else {
      addEnvSystem(name, val)
    }
  } catch (err) {
    try {
      error(err as Error)
      return addEnvSystem(name, val)
    } catch (err2) {
      error(err2 as Error)
    }
    error(`Failed to export environment variable ${name}=${val}. You should add it manually.`)
  }
}

function addEnvSystem(name: string, valGiven: string | undefined) {
  const val = valGiven ?? ""
  switch (process.platform) {
    case "win32": {
      // We do not use `execa.sync(`setx PATH "${path};%PATH%"`)` because of its character limit
      execPowershell(`[Environment]::SetEnvironmentVariable("${name}", "${val}", "User")`)
      info(`${name}="${val} was set in the environment."`)
      return
    }
    case "linux":
    case "darwin": {
      // find profile path
      const profile_path = untildify(".profile")
      appendFileSync(profile_path, `\nexport ${name}="${val}"\n`)
      info(`${name}="${val} was added to "${profile_path}"`)
      return
    }
    default: {
      // fall through shell path modification
    }
  }
  process.env[name] = val
}

/** An add path function that works locally or inside GitHub Actions */
export function addPath(path: string) {
  process.env.PATH = `${path}${delimiter}${process.env.PATH}`
  try {
    if (isGitHubCI()) {
      ghAddPath(path)
    } else {
      addPathSystem(path)
    }
  } catch (err) {
    try {
      error(err as Error)
      return addPathSystem(path)
    } catch (err2) {
      error(err2 as Error)
    }
    error(`Failed to add ${path} to the percistent PATH. You should add it manually.`)
  }
}

function addPathSystem(path: string) {
  switch (process.platform) {
    case "win32": {
      // We do not use `execa.sync(`setx PATH "${path};%PATH%"`)` because of its character limit and also because %PATH% is different for user and system
      execPowershell(
        `$USER_PATH=([Environment]::GetEnvironmentVariable("PATH", "User")); [Environment]::SetEnvironmentVariable("PATH", "${path};$USER_PATH", "User")`
      )
      info(`${path} was added to the PATH.`)
      return
    }
    case "linux":
    case "darwin": {
      const profile_path = untildify(".profile")
      appendFileSync(profile_path, `\nexport PATH=${path}:$PATH\n`)
      info(`${path} was added to "${profile_path}"`)
      return
    }
    default: {
      return
    }
  }
}
