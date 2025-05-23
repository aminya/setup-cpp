import { promises } from "fs"
import { resolve } from "path"
import { grantUserWriteAccess } from "admina"
import { info, warning } from "ci-log"
import memoize from "memoizee"
import { pathExists } from "path-exists"
import { untildifyUser } from "untildify-user"
const { appendFile, readFile, writeFile } = promises

export const defaultGuard = "envosman"
export const defaultRcPath = untildifyUser("~/.envosmanrc")

/**
 * Options for adding an rc file
 */
export type RcOptions = {
  /** The path to the RC file that the env variables should be added to. (Default to "~/.envosmanrc") */
  rcPath: string

  /** Provide a name (your tool) to add a variable guard for sourcing your rc file (Default to "envosman") */
  guard?: string
}

async function sourceRCInRc_(options: RcOptions) {
  const bashrc = untildifyUser("~/.bashrc")
  const profile = untildifyUser("~/.profile")

  const rcPath = resolve(options.rcPath)

  // avoid source loops
  if (rcPath === bashrc || rcPath === profile) {
    return
  }

  const guard = options.guard ?? defaultGuard
  const sourceRcString =
    `\n# ${guard}\nif [[ "$SOURCE_${guard.toUpperCase()}RC" != 0 && -f "${rcPath}" ]]; then source "${rcPath}"; fi\n`

  try {
    await Promise.all([
      addRCHeader(options),
      addSourceToTargetRc(sourceRcString, bashrc),
      addSourceToTargetRc(sourceRcString, profile),
    ])
  } catch (err) {
    warning(`Failed to add ${sourceRcString} to .profile or .bashrc. You should add it manually: ${err}`)
  }
}

/**
 * handles adding conditions to source rc file from .bashrc and .profile
 */
export const sourceRCInRc = memoize(sourceRCInRc_, { promise: true })

async function addRCHeader(options: RcOptions) {
  // a variable that prevents source rc from being called from .bashrc and .profile
  const rcHeader = options.guard === undefined
    ? "\n# Automatically Generated by envosman\n"
    : `\n# Automatically Generated by envosman ${options.guard}\nexport SOURCE_${options.guard.toUpperCase()}RC=0\n`

  if (await pathExists(options.rcPath)) {
    const rcContent = await readFile(options.rcPath, "utf8")
    if (!rcContent.includes(rcHeader)) {
      // already executed setupCppInProfile
      await appendFile(options.rcPath, `\n${rcHeader}\n`)
      info(`Added ${rcHeader} to ${options.rcPath}`)
    }
  }
}

async function addSourceToTargetRc(sourceRcString: string, targetRcPath: string) {
  if (await pathExists(targetRcPath)) {
    const bashrcContent = await readFile(targetRcPath, "utf-8")
    if (!bashrcContent.includes(sourceRcString)) {
      await appendFile(targetRcPath, sourceRcString)
      info(`${sourceRcString} was added to ${targetRcPath}`)
    }
  }
}

export async function finalizeRC(rcOptions: RcOptions) {
  if (await pathExists(rcOptions.rcPath)) {
    const entries = (await readFile(rcOptions.rcPath, "utf-8")).split("\n")

    const uniqueEntries = [...new Set(entries.reverse())].reverse() // remove duplicates, keeping the latest entry

    await writeFile(rcOptions.rcPath, uniqueEntries.join("\n"))

    await grantUserWriteAccess(rcOptions.rcPath)
  }
}
