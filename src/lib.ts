import { isCI } from "ci-info"
import { info } from "ci-log"
import { finalizeRC } from "envosman"
import numerous from "numerous"
import numerousLocale from "numerous/locales/en.js"
import timeDelta from "time-delta"
import timeDeltaLocale from "time-delta/locales/en.js"
import { untildifyUser } from "untildify-user"
import packageJson from "../package-version.json"
import { getCompilerInfo, installCompiler } from "./compilers.js"
import { installTool } from "./installTool.js"
import { type Opts, rcOptions } from "./options.js"
import { installSetupCpp } from "./setup-cpp-installer.js"
import { type Inputs, llvmTools, tools } from "./tool.js"
import { isArch } from "./utils/env/isArch.js"
import { ubuntuVersion } from "./utils/env/ubuntu_version.js"
import { setupPacmanPack } from "./utils/setup/setupPacmanPack.js"
import { syncVersions } from "./versions/versions.js"

// re-export for the setup-cpp CLI
export { GITHUB_ACTIONS } from "ci-info"
export { error, info, success, warning } from "ci-log"
export { packageJson }

/**
 * The result of the setup, with the success and error messages. If the setup was successful, the error messages are empty.
 */
export type SetupCppResult = {
  successMessages: string[]
  errorMessages: string[]
}

/**
 * Set up the C++ tools
 *
 * @param opts - The options
 * @returns The result of the setup, with the success and error messages. If the setup was successful, the error messages are empty.
 */
export async function setupCpp(opts: Opts = {}): Promise<SetupCppResult> {
  // cpu architecture
  const arch = opts.architecture ?? process.arch

  // the installation dir for the tools that are downloaded directly
  const setupCppDir = process.env.SETUP_CPP_DIR ?? untildifyUser("~")

  // report messages
  const successMessages: string[] = []
  const errorMessages: string[] = []

  const timeFormatter = timeDelta.create({ autoloadLocales: true })
  timeDelta.addLocale(timeDeltaLocale as timeDelta.Locale)
  numerous.addLocale(numerousLocale as numerous.Locale)
  let time1: number
  let time2: number

  // installing the specified tools

  const osVersion = await ubuntuVersion()

  const compilerInfo = opts.compiler !== undefined ? getCompilerInfo(opts.compiler) : undefined

  // sync the version for the llvm tools
  if (!syncVersions(opts, [...llvmTools, "compiler"] as Inputs[], compilerInfo)) {
    return {
      successMessages: [],
      errorMessages: ["The same version must be used for llvm, clang-format and clang-tidy"],
    }
  }

  if (isArch() && typeof opts.cppcheck === "string" && typeof opts.gcovr === "string") {
    info("installing python-pygments to avoid conflicts with cppcheck and gcovr on Arch linux")
    await setupPacmanPack("python-pygments")
  }

  // loop over the tools and run their setup function
  const toolsToInstall = tools.filter(tool => {
    const version = opts[tool]
    return version !== undefined && version !== "false"
  })

  // if setup-cpp option is not passed, install setup-cpp by default
  const installSetupCppPromise = opts["setup-cpp"] === undefined || opts["setup-cpp"]
    ? installSetupCpp(packageJson.version, opts["node-package-manager"])
    : Promise.resolve(undefined)

  let failedFast = false
  for (const tool of toolsToInstall) { // get the version or "true" or undefined for this tool from the options
    const version = opts[tool]!

    const timeout = opts.timeout !== undefined ? Number.parseFloat(opts.timeout) * 60 * 1000 : undefined
    // running the setup function for this tool
    time1 = Date.now()

    // eslint-disable-next-line no-await-in-loop
    await installTool(
      tool,
      version,
      osVersion,
      arch,
      setupCppDir,
      successMessages,
      errorMessages,
      timeout,
    )
    time2 = Date.now()
    info(`took ${timeFormatter.format(time1, time2) || "0 seconds"}`)

    // fail fast inside CI when any tool fails
    if (errorMessages.length !== 0 && isCI) {
      failedFast = true
      break
    }
  }

  if (!failedFast && compilerInfo !== undefined) {
    // install the specified compiler
    const time1Compiler = Date.now()
    await installCompiler(
      compilerInfo.compiler,
      compilerInfo.version,
      osVersion,
      setupCppDir,
      arch,
      successMessages,
      errorMessages,
    )
    const time2Compiler = Date.now()
    info(`took ${timeFormatter.format(time1Compiler, time2Compiler) || "0 seconds"}`)
  }

  const installSetupCppResult = await installSetupCppPromise
  if (typeof installSetupCppResult === "string") {
    successMessages.push(installSetupCppResult)
  } else if (installSetupCppResult instanceof Error) {
    errorMessages.push(installSetupCppResult.message)
  }

  await finalizeRC(rcOptions)

  // return true if there are no errors
  return { successMessages, errorMessages }
}
