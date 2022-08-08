import { join } from "path"
import untildify from "untildify"
import { isSudo } from "root-tools"

export function untildify_user(path: string) {
  if (isSudo() && typeof process.env.SUDO_USER === "string") {
    // use the user profile even if root
    if (process.platform === "darwin") {
      return join("/Users/", process.env.SUDO_USER, path)
    } else {
      return join("/home/", process.env.SUDO_USER, path)
    }
  } else {
    return untildify(`~/${path}`)
  }
}
