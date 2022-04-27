import execa from "execa"
import { isRoot } from "../env/sudo"

export function execSudo(file: string, args: string[], cwd?: string) {
  if (isRoot()) {
    return execa.commandSync(`sudo ${[file, ...args].map((arg) => `'${arg}'`).join(" ")}`, {
      shell: true,
      cwd,
      stdio: "inherit",
    })
  } else {
    return execa.sync(file, args, { stdio: "inherit" })
  }
}
