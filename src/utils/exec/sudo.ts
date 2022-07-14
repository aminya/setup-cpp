import { execaSync, execaCommandSync } from "execa"
import { isRoot } from "../env/sudo"

export function execSudo(file: string, args: string[], cwd?: string) {
  if (isRoot()) {
    return execaCommandSync(`sudo ${[file, ...args].map((arg) => `'${arg}'`).join(" ")}`, {
      shell: true,
      cwd,
      stdio: "inherit",
    })
  } else {
    return execaSync(file, args, { stdio: "inherit" })
  }
}
