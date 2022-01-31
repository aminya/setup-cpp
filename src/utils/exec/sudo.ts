import execa from "execa"
import { isRoot } from "../env/sudo"

export function execSudo(file: string, args: string[], cwd?: string) {
  if (isRoot()) {
    return execa.command(`sudo ${[file, ...args].map((arg) => `'${arg}'`).join(" ")}`, {
      shell: true,
      cwd,
      stdio: "inherit",
    })
  } else {
    return execa(file, args)
  }
}
