import { exportVariable } from "@actions/core"
import * as core from "@actions/core"
import execa from "execa"
import { isGitHubCI } from "./isci"
import { untildify_user as untildify } from "../path/untildify"
import { appendFileSync } from "fs"
import { join } from "path"
import { isRoot } from "./sudo"
import { error } from "../io/io"

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
      if (val.length <= 1024) {
        execa.sync(`setx "${name}" "${val}"`)
      } else {
        execa.sync(`powershell -C "[Environment]::SetEnvironmentVariable('${name}', '${val}', 'User')"`)
      }
      core.info(`${name}="${val} was set in the environment."`)
      return
    }
    case "linux":
    case "darwin": {
      // find profile path
      let profile_path = untildify(".profile")
      if (isRoot() && typeof process.env.SUDO_USER === "string") {
        // use the user profile even if root
        profile_path = join("/home/", process.env.SUDO_USER, ".profile")
      }

      appendFileSync(profile_path, `\nexport ${name}="${val}"\n`)
      core.info(`${name}="${val} was added to "${profile_path}"`)
      return
    }
    default: {
      // fall through shell path modification
    }
  }
  process.env[name] = val
}
