import * as execa from "execa"
import which from "which"

/** The cached powershell path */
let powershell: string | undefined

/**
 * Asynchronously execute a powershell command.
 *
 * @param command The powershell command to execute
 * @param startupFlags The optional startup flags to be passed to powershell. Defaults to `["-NoProfile", "-NoLogo",
 *   "-NonInteractive"]`. This means that the Powershell profile is not sourced first.
 * @param execOptions The options passed to `execa`. Defaults to `{ stdio: "inherit" }`
 * @returns A promise to the execution result
 * @note It prefers `pwsh` over `powershell`
 */
export function execPowershell(
  command: string,
  startupFlags: string[] = ["-NoProfile", "-NoLogo", "-NonInteractive"],
  execOptions: execa.Options = { stdio: "inherit" }
): execa.ExecaChildProcess<string> {
  return execa.execa(getPowerShell(), [...startupFlags, "-c", command], execOptions)
}

/**
 * Execute a powershell command.
 *
 * @param command The powershell command to execute
 * @param startupFlags The optional startup flags to be passed to powershell. Defaults to `["-NoProfile", "-NoLogo",
 *   "-NonInteractive"]`. This means that the Powershell profile is not sourced first.
 * @param execOptions The options passed to `execa`. Defaults to `{ stdio: "inherit" }`
 * @returns The execution result
 * @note It prefers `pwsh` over `powershell`
 */
export function execPowershellSync(
  command: string,
  startupFlags: string[] = ["-NoProfile", "-NoLogo", "-NonInteractive"],
  execOptions: execa.SyncOptions = { stdio: "inherit" }
): execa.ExecaSyncReturnValue<string> {
  return execa.execaSync(getPowerShell(), [...startupFlags, "-c", command], execOptions)
}

/**
 * Get the path to the powershell executable.
 *
 * @note It prefers `pwsh` over `powershell`
 * @note It caches the path for the subsequent calls to this function
 */
export function getPowerShell() {
  if (powershell === undefined) {
    const maybePwsh = which.sync("pwsh", { nothrow: true })
    if (maybePwsh !== null) {
      powershell = maybePwsh
    }
    const maybePowerShell = which.sync("powershell", { nothrow: true })
    if (maybePowerShell !== null) {
      powershell = maybePowerShell
    }
  }
  if (powershell === undefined) {
    throw new Error("Could not find powershell")
  }
  return powershell
}
