import { promises } from "fs"
import { delimiter } from "path"
import { addPath as ghAddPath } from "@actions/core"
import { GITHUB_ACTIONS } from "ci-info"
import { error, info } from "ci-log"
import { execPowershell } from "exec-powershell"
import { defaultRcPath, sourceRCInRc } from "./rc-file.js"
const { appendFile } = promises

/**
 * The options for adding a PATH variable
 */
type AddPathOptions = {
  /**
   * The path to the RC file that the PATH variables should be added to.
   */
  rcPath: string
  /** Provide a name (your tool) to add a variable guard for sourcing your rc file */
  guard?: string
}
/**
 * Add a path to the PATH environment variable.
 *
 * This function is cross-platforms and works in all the local or CI systems.
 */

export async function addPath(path: string, givenOptions: Partial<AddPathOptions> = {}) {
  const options = { rcPath: defaultRcPath, ...givenOptions }

  if (isIgnoredPath(path)) {
    return
  }

  process.env.PATH = `${path}${delimiter}${process.env.PATH}`
  try {
    if (GITHUB_ACTIONS) {
      try {
        ghAddPath(path)
      } catch (err) {
        error(err as Error)
        await addPathSystem(path, options)
      }
    } else {
      await addPathSystem(path, options)
    }
  } catch (err) {
    error(`${err}\nFailed to add ${path} to the percistent PATH. You should add it manually.`)
  }
}

async function addPathSystem(path: string, options: AddPathOptions) {
  switch (process.platform) {
    case "win32": {
      // We do not use `execaSync(`setx PATH "${path};%PATH%"`)` because of its character limit and also because %PATH% is different for user and system
      await execPowershell(
        `$USER_PATH=([Environment]::GetEnvironmentVariable("PATH", "User")); [Environment]::SetEnvironmentVariable("PATH", "${path};$USER_PATH", "User")`,
      )
      info(`"${path}" was added to the PATH.`)
      return
    }
    case "linux":
    case "darwin": {
      await sourceRCInRc(options)
      await appendFile(options.rcPath, `\nexport PATH="${path}:$PATH"\n`)
      info(`"${path}" was added to "${options.rcPath}"`)
      return
    }
    default: {
      return
    }
  }
}

const ignoredPaths = [/\/usr\/bin\/?/, /\/usr\/local\/bin\/?/]

/** Skip adding /usr/bin to PATH if it is already there */
function isIgnoredPath(path: string) {
  if (ignoredPaths.some((checkedPath) => checkedPath.test(path))) {
    const paths = process.env.PATH?.split(delimiter) ?? []
    return paths.includes(path)
  }
  return false
}
