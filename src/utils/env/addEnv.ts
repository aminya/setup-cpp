import { exportVariable, addPath as ghAddPath, info } from "@actions/core"
import { isGitHubCI } from "./isci"
import { untildify_user as untildify } from "../path/untildify"
import { appendFileSync, existsSync, readFileSync } from "fs"
import { error, warning } from "../io/io"
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

export const cpprc_path = untildify(".cpprc")

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
      setupCppInProfile()
      appendFileSync(cpprc_path, `\nexport ${name}="${val}"\n`)
      info(`${name}="${val} was added to "${cpprc_path}"`)
      return
    }
    default: {
      // fall through shell path modification
    }
  }
  process.env[name] = val
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
      setupCppInProfile()
      appendFileSync(cpprc_path, `\nexport PATH=${path}:$PATH\n`)
      info(`${path} was added to "${cpprc_path}"`)
      return
    }
    default: {
      return
    }
  }
}

let setupCppInProfile_called = false

/// handles adding conditions to source .cpprc file from .bashrc and .profile
export function setupCppInProfile() {
  if (setupCppInProfile_called) {
    return
  }

  // a variable that prevents source_cpprc from being called from .bashrc and .profile
  const source_cpprc_str = "export SOURCE_CPPRC=0"

  if (existsSync(cpprc_path)) {
    const cpprc_content = readFileSync(cpprc_path, "utf8")
    if (cpprc_content.includes(source_cpprc_str)) {
      // already executed setupCppInProfile
      return
    }
  }

  appendFileSync(cpprc_path, `\n${source_cpprc_str}\n`)
  info(`Added ${source_cpprc_str} to ${cpprc_path}`)

  const source_cpprc_string = `\n# source .cpprc if SOURCE_CPPRC is not set to 0\nif [[ "$SOURCE_CPPRC" != 0 && -f "${cpprc_path}" ]]; then source "${cpprc_path}"; fi\n`

  try {
    // source cpprc in .profile
    const profile_path = untildify(".profile")
    appendFileSync(profile_path, source_cpprc_string)
    info(`${source_cpprc_string} was added to ${profile_path}`)

    // source cpprc in .bashrc too
    const bashrc_path = untildify(".bashrc")
    appendFileSync(bashrc_path, source_cpprc_string)
    info(`${source_cpprc_string} was added to ${bashrc_path}`)
  } catch (err) {
    warning(`Failed to add ${source_cpprc_string} to .profile or .bashrc. You should add it manually: ${err}`)
  }

  setupCppInProfile_called = true
}
