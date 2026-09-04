/* eslint-disable require-atomic-updates */
import { info } from "ci-log"
import { type AddPathOptions, addPath } from "envosman"
import { execaSync } from "execa"
import { untildifyUser } from "untildify-user"
import which from "which"

/** The information about an installation result. */
export type InstallationInfo = {
  /** The top install dir. */
  installDir?: string
  /** The bin dir of the package. */
  binDir: string
  /** The path to the package binary. */
  bin?: string
}

/** Optional root-provided behavior and PATH configuration for Chocolatey setup. */
export type SetupChocoPackDependencies = {
  /** Options for adding the Chocolatey bin directory to PATH. */
  rcOptions?: AddPathOptions
  /** Installs Chocolatey when it is not already available. */
  setupChocolatey?: () => Promise<unknown>
}

const defaultRcOptions: AddPathOptions = {
  rcPath: untildifyUser("~/.cpprc"),
  guard: "cpp",
}

let hasChoco = false

/** A function that installs a package using Chocolatey. */
export async function setupChocoPack(
  name: string,
  version?: string,
  args: string[] = [],
  dependencies?: SetupChocoPackDependencies,
): Promise<InstallationInfo> {
  info(`Installing ${name} ${version ?? ""} via chocolatey`)

  if (!hasChoco || which.sync("choco", { nothrow: true }) === null) {
    if (dependencies?.setupChocolatey === undefined) {
      throw new Error("Unable to install Chocolatey package: setupChocolatey dependency is not configured")
    }
    await dependencies.setupChocolatey()
    hasChoco = true
  }

  // https://github.com/jberezanski/ChocolateyPackages/issues/97#issuecomment-986825694
  const PATH = process.env.PATH
  const env = { ...process.env }
  env.TMP = undefined
  env.TEMP = undefined
  env.Path = undefined
  env.PATH = PATH

  if (version !== undefined && version !== "") {
    execaSync("choco", ["install", "-y", name, `--version=${version}`, ...args], {
      env,
      extendEnv: false,
      stdio: "inherit",
    })
  } else {
    try {
      execaSync("choco", ["install", "-y", name, ...args], { env, extendEnv: false, stdio: "inherit" })
    } catch (err) {
      // if the package requires a reboot, downgrade the error to a notice
      if ((err as Error).message.includes("exit code 3010")) {
        info(`${name} might require a reboot for the completion of the installation.`)
      } else {
        throw err
      }
    }
  }

  const binDir = `${process.env.ChocolateyInstall ?? "C:/ProgramData/chocolatey"}/bin`
  await addPath(binDir, dependencies?.rcOptions ?? defaultRcOptions)

  return { binDir }
}
