import which from "which"
import execa from "execa"

/** Detect if sudo is available and the user has root privileges */
export function isSudo(): boolean {
  return (Boolean(process.env.CI) || isRoot()) && which.sync("sudo", { nothrow: true }) !== null
}

/** Detect if the process has root privileges */
export function isRoot(): boolean {
  return process.getuid?.() === 0
}

/** Prepend `sudo` to the command if sudo is available */
export function prependSudo(command: string) {
  if (isSudo()) {
    return `sudo ${command}`
  }
  return command
}

/**
 * Execute a command as root if sudo is available. Otherwise executes the command normally without sudo.
 *
 * @param program The program to spawn
 * @param args The command arguments
 * @param execOptions The options passed to `execa`. Defaults to `{ stdio: "inherit", shell: true }`
 * @returns The execution result
 */
export function execRootSync(
  program: string,
  args: string[] = [],
  execOptions: execa.SyncOptions = { stdio: "inherit", shell: true }
): execa.ExecaSyncReturnValue<string> {
  if (isSudo()) {
    return execa.commandSync(`sudo ${[program, ...args].map((arg) => `'${arg}'`).join(" ")}`, execOptions)
  } else {
    return execa.sync(program, args, execOptions)
  }
}

/**
 * Asynchronously execute a command as root if sudo is available. Otherwise executes the command normally without sudo.
 *
 * @param program The program to spawn
 * @param args The command arguments
 * @param execOptions The options passed to `execa`. Defaults to `{ stdio: "inherit", shell: true }`
 * @returns A promise to the execution result
 */
export function execRoot(
  program: string,
  args: string[] = [],
  execOptions: execa.Options = { stdio: "inherit", shell: true }
): execa.ExecaChildProcess<string> {
  if (isSudo()) {
    return execa.command(`sudo ${[program, ...args].map((arg) => `'${arg}'`).join(" ")}`, execOptions)
  } else {
    return execa(program, args, execOptions)
  }
}
