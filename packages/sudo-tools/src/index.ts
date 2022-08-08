import which from "which"
import execa from "execa"

let isSudoCache: boolean | undefined = undefined

/**
 * Detect if sudo is available and the user has root privileges
 *
 * @note it caches the result for the subsequent calls to this function.
 */
export function isRoot(): boolean {
  if (isSudoCache !== undefined) {
    return isSudoCache
  }
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition
  isSudoCache = (Boolean(process.env.CI) || process.getuid?.() === 0) && which.sync("sudo", { nothrow: true }) !== null
  return isSudoCache
}

/** Prepend `sudo` to the command if sudo is available */
export function prependSudo(command: string) {
  if (isRoot()) {
    return `sudo ${command}`
  }
  return command
}

/**
 * Execute a command as sudo if sudo is available. Otherwise executes the command without sudo.
 *
 * @param program The program to spawn
 * @param args The command arguments
 * @param execOptions The options passed to `execa`.
 *
 *   Defaults to `{ stdio: "inherit" }`
 */
export function execSudo(program: string, args: string[] = [], execOptions: execa.SyncOptions = { stdio: "inherit" }) {
  if (isRoot()) {
    return execa.commandSync(`sudo ${[program, ...args].map((arg) => `'${arg}'`).join(" ")}`, execOptions)
  } else {
    return execa.sync(program, args, execOptions)
  }
}
