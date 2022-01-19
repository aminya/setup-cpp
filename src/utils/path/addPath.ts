import { addPath as ghAddPath } from "@actions/core"
import { delimiter } from "path"
import * as core from "@actions/core"
import execa from "execa"
import { isGitHubCI } from "../env/isci"
import { untildify_user as untildify } from "./untildify"
import { appendFileSync } from "fs"

/** An add path function that works locally or inside GitHub Actions */
export function addPath(path: string) {
  try {
    if (isGitHubCI()) {
      ghAddPath(path)
    } else {
      addPathSystem(path)
    }
  } catch (err) {
    try {
      core.error(err as Error)
      return addPathSystem(path)
    } catch (err2) {
      core.error(err2 as Error)
    }
    core.error(`Failed to add ${path} to the percistent PATH. You should add it manually.`)
  }
}

function addPathSystem(path: string) {
  switch (process.platform) {
    case "win32": {
      execa.sync(`setx PATH=${path};%PATH%`)
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
      // fall through shell path modification
    }
  }
  process.env.PATH = `${path}${delimiter}${process.env.PATH}`
}
