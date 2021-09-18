import execa from "execa"

let _issudo: boolean | undefined = undefined

export function isRoot(): boolean {
  if (_issudo !== undefined) {
    return _issudo
  }
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition
  _issudo = Boolean(process.env.CI) || process.getuid?.() === 0
  return _issudo
}

export function mightSudo(command: string) {
  if (isRoot()) {
    return `sudo ${command}`
  }
  return command
}

export function execaSudo(file: string, args: string[]) {
  if (isRoot()) {
    return execa.command(`sudo ${[file, ...args].join(" ")}`, { shell: true })
  } else {
    return execa(file, args)
  }
}
