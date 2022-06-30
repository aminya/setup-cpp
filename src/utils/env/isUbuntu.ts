import which from "which"

let isUbuntuCache: undefined | boolean = undefined

export function isUbuntu(): boolean {
  if (process.platform !== "linux") {
    return false
  }
  if (isUbuntuCache === undefined) {
    const apt = "apt-get"
    isUbuntuCache = which.sync(apt, { nothrow: true }) !== null
  }

  return isUbuntuCache
}
