import execa from "execa"
import which from "which"

let _issudo: boolean | undefined = undefined

export function isRoot(): boolean {
  if (_issudo !== undefined) {
    return _issudo
  }
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition
  _issudo = (Boolean(process.env.CI) || process.getuid?.() === 0) && which.sync("sudo", { nothrow: true }) !== null
  return _issudo
}

export function mightSudo(command: string) {
  if (isRoot()) {
    return `sudo ${command}`
  }
  return command
}

export function execaSudo(file: string, args: string[], cwd?: string) {
  if (isRoot()) {
    return execa.command(`sudo ${[file, ...args].map((arg) => `'${arg}'`).join(" ")}`, { shell: true, cwd })
  } else {
    return execa(file, args)
  }
}
