import which from "which"

let isArchCache: undefined | boolean = undefined

/** Check whether pacman is available on the current Linux host. */
export function isArch(): boolean {
  if (process.platform !== "linux") {
    return false
  }
  if (isArchCache === undefined) {
    // detect arch by checking if pacman exists
    isArchCache = which.sync("pacman", { nothrow: true }) !== null
  }

  return isArchCache
}
