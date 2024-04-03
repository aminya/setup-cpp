import { addPath as ghAddPath, exportVariable, info, setFailed } from "@actions/core"
import { grantUserWriteAccess } from "admina"
import { GITHUB_ACTIONS } from "ci-info"
import { error, warning } from "ci-log"
import escapeSpace from "escape-path-with-spaces"
import escapeQuote from "escape-quotes"
import { execPowershell } from "exec-powershell"
import { appendFileSync, readFile, readFileSync, writeFileSync } from "fs"
import { delimiter } from "path"
import { pathExists } from "path-exists"
import { untildifyUser } from "untildify-user"

type AddEnvOptions = {
  /** If true, the value will be escaped with quotes and spaces will be escaped with backslash */
  shouldEscapeSpace: boolean
  /** If true, the variable will be only added if it is not defined */
  shouldAddOnlyIfNotDefined: boolean
}

const defaultAddEnvOptions: AddEnvOptions = {
  shouldEscapeSpace: false,
  shouldAddOnlyIfNotDefined: false,
}

/**
 * Add an environment variable.
 *
 * This function is cross-platforms and works in all the local or CI systems.
 */
export async function addEnv(
  name: string,
  valGiven: string | undefined,
  givenOptions: Partial<AddEnvOptions> = defaultAddEnvOptions,
) {
  const options = { ...defaultAddEnvOptions, ...givenOptions }

  const val = escapeString(valGiven ?? "", options.shouldEscapeSpace)
  try {
    if (GITHUB_ACTIONS) {
      try {
        if (options.shouldAddOnlyIfNotDefined) {
          if (process.env[name] !== undefined) {
            info(`Environment variable ${name} is already defined. Skipping.`)
            return
          }
        }
        exportVariable(name, val)
      } catch (err) {
        error(err as Error)
        await addEnvSystem(name, val, options)
      }
    } else {
      await addEnvSystem(name, val, options)
    }
  } catch (err) {
    error(err as Error)
    setFailed(`Failed to export environment variable ${name}=${val}. You should add it manually.`)
  }
}

function escapeString(valGiven: string, shouldEscapeSpace: boolean = false) {
  const spaceEscaped = shouldEscapeSpace ? escapeSpace(valGiven) : valGiven
  return escapeQuote(spaceEscaped, "\"", "\\")
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

/**
 * Add a path to the PATH environment variable.
 *
 * This function is cross-platforms and works in all the local or CI systems.
 */
export async function addPath(path: string) {
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
        await addPathSystem(path)
      }
    } else {
      await addPathSystem(path)
    }
  } catch (err) {
    error(err as Error)
    setFailed(`Failed to add ${path} to the percistent PATH. You should add it manually.`)
  }
}

export const cpprc_path = untildifyUser("~/.cpprc")

async function addEnvSystem(name: string, valGiven: string | undefined, options: AddEnvOptions) {
  const val = valGiven ?? ""
  switch (process.platform) {
    case "win32": {
      if (options.shouldAddOnlyIfNotDefined) {
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
      await setupCppInProfile()
      if (options.shouldAddOnlyIfNotDefined) {
        appendFileSync(cpprc_path, `\nif [ -z "\${${name}}" ]; then export ${name}="${val}"; fi\n`)
        info(`if not defined ${name} then ${name}="${val}" was added to "${cpprc_path}`)
      } else {
        appendFileSync(cpprc_path, `\nexport ${name}="${val}"\n`)
        info(`${name}="${val}" was added to "${cpprc_path}`)
      }
      return
    }
    default: {
      // fall through shell path modification
    }
  }
  process.env[name] = val
}

async function addPathSystem(path: string) {
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
      await setupCppInProfile()
      appendFileSync(cpprc_path, `\nexport PATH="${path}:$PATH"\n`)
      info(`"${path}" was added to "${cpprc_path}"`)
      return
    }
    default: {
      return
    }
  }
}

/* eslint-disable require-atomic-updates */
let setupCppInProfile_called = false

/// handles adding conditions to source .cpprc file from .bashrc and .profile
export async function setupCppInProfile() {
  if (setupCppInProfile_called) {
    return
  }

  // a variable that prevents source_cpprc from being called from .bashrc and .profile
  const source_cpprc_str = "# Automatically Generated by setup-cpp\nexport SOURCE_CPPRC=0"

  if (await pathExists(cpprc_path)) {
    const cpprc_content = readFileSync(cpprc_path, "utf8")
    if (!cpprc_content.includes(source_cpprc_str)) {
      // already executed setupCppInProfile
      appendFileSync(cpprc_path, `\n${source_cpprc_str}\n`)
      info(`Added ${source_cpprc_str} to ${cpprc_path}`)
    }
  }

  // source cpprc in bashrc/profile

  const source_cpprc_string =
    `\n# source .cpprc if SOURCE_CPPRC is not set to 0\nif [[ "$SOURCE_CPPRC" != 0 && -f "${cpprc_path}" ]]; then source "${cpprc_path}"; fi\n`

  try {
    // source cpprc in .profile
    const profile_path = untildifyUser("~/.profile")
    if (await pathExists(profile_path)) {
      const profileContent = readFileSync(profile_path, "utf-8")
      if (!profileContent.includes(source_cpprc_string)) {
        appendFileSync(profile_path, source_cpprc_string)
        info(`${source_cpprc_string} was added to ${profile_path}`)
      }
    }

    // source cpprc in .bashrc too
    const bashrc_path = untildifyUser("~/.bashrc")
    if (await pathExists(bashrc_path)) {
      const bashrcContent = readFileSync(bashrc_path, "utf-8")
      if (!bashrcContent.includes(source_cpprc_string)) {
        appendFileSync(bashrc_path, source_cpprc_string)
        info(`${source_cpprc_string} was added to ${bashrc_path}`)
      }
    }
  } catch (err) {
    warning(`Failed to add ${source_cpprc_string} to .profile or .bashrc. You should add it manually: ${err}`)
  }

  setupCppInProfile_called = true
}

export async function finalizeCpprc() {
  if (await pathExists(cpprc_path)) {
    const entries = readFileSync(cpprc_path, "utf-8").split("\n")

    const unique_entries = [...new Set(entries.reverse())].reverse() // remove duplicates, keeping the latest entry

    writeFileSync(cpprc_path, unique_entries.join("\n"))

    await grantUserWriteAccess(cpprc_path)
  }
}
