import memoize from "memoizee"
import which from "which"

function hasAptGet_(): boolean {
  if (process.platform !== "linux") {
    return false
  }
  return which.sync("apt-get", { nothrow: true }) !== null
}

export const hasAptGet = memoize(hasAptGet_)
