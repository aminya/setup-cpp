import { getUbuntuVersion } from "ubuntu-version"
import makeSynchronous from "make-synchronous"

export function ubuntuVersion(): number[] | null {
  if (process.platform === "linux") {
    const versionSplitted = makeSynchronous(getUbuntuVersion)()

    if (versionSplitted.length === 0) {
      throw new Error("Failed to get the ubuntu major version.")
    }

    return versionSplitted
  } else {
    return null
  }
}
