import which from "which"

let hasDnfCache: undefined | boolean = undefined

export function hasDnf(): boolean {
  if (process.platform !== "linux") {
    return false
  }
  if (hasDnfCache === undefined) {
    hasDnfCache = which.sync("dnf", { nothrow: true }) !== null
  }

  return hasDnfCache
}
