import os from "os"
import { warning } from "ci-log"
import memoize from "memoizee"
import { installAptPack } from "setup-apt"
import { getUbuntuVersion } from "ubuntu-version"
import which from "which"
import { isUbuntu } from "./isUbuntu.js"

async function ubuntuVersion_(): Promise<number[] | null> {
  try {
    if (isUbuntu()) {
      try {
        if (which.sync("lsb_release", { nothrow: true }) === null) {
          await installAptPack([{ name: "lsb-release" }])
        }
      } catch {
        return detectUsingOsVersion()
      }

      const versionSplitted = await getUbuntuVersion()

      if (versionSplitted.length === 0) {
        return detectUsingOsVersion()
      }

      return versionSplitted
    } else {
      return null
    }
  } catch (err) {
    warning((err as Error).toString())
    return null
  }
}

/** Detect Ubuntu version */
export const ubuntuVersion = memoize(ubuntuVersion_, { promise: true })

/** Detect Ubuntu version using os.version() for Ubuntu based distros */
function detectUsingOsVersion() {
  if (!("version" in os && typeof os.version === "function")) {
    return null
  }

  // #40~22.04.3-Ubuntu SMP PREEMPT_DYNAMIC Tue Jul 30 17:30:19 UTC 2
  const osVersion: string = os.version()
  // parse the version
  const versionMatch = osVersion.match(/(\d+)\.(\d+)\.(\d+)/)
  if (versionMatch === null) {
    return null
  }

  const majorVersion = Number.parseInt(versionMatch[1], 10)
  const minorVersion = Number.parseInt(versionMatch[2], 10)
  const patchVersion = Number.parseInt(versionMatch[3], 10)

  return [majorVersion, minorVersion, patchVersion]
}
