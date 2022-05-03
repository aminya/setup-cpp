import * as execa from "execa"
import { isRoot } from "../env/sudo"

export function execSudo(file: string, args: string[], cwd?: string) {
  if (isRoot()) {
    return execa.execaCommandSync(`sudo ${[file, ...args].map((arg) => `'${arg}'`).join(" ")}`, {
      shell: true,
      cwd,
      stdio: "inherit",
    })
  } else {
    return execa.execaSync(file, args, { stdio: "inherit" })
  }
}
