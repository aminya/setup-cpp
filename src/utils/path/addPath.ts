import { addPath as ghAddPath } from "@actions/core"
import { delimiter } from "path"
import * as core from "@actions/core"
import { isGitHubCI } from "../env/isci"
import { untildify_user as untildify } from "./untildify"
import { appendFileSync } from "fs"
import { error } from "../io/io"
import { execPowershell } from "../exec/powershell"

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
        `$USER_PATH=[Environment]::GetEnvironmentVariable('PATH', 'User'); [Environment]::SetEnvironmentVariable('PATH', \\"${path};$USER_PATH\\", 'User')`
      )
      core.info(`${path} was added to the PATH.`)
      return
    }
    case "linux":
    case "darwin": {
      const profile_path = untildify(".profile")
      appendFileSync(profile_path, `\nexport PATH=${path}:$PATH\n`)
      core.info(`${path} was added to "${profile_path}"`)
      return
    }
    default: {
      return
    }
  }
}
