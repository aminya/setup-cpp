import os from "os"
import { warning } from "ci-log"
import memoize from "memoizee"
import { installAptPack } from "setup-apt"
import { getUbuntuVersion } from "ubuntu-version"
import which from "which"
import { isUbuntu } from "./isUbuntu.js"

async function ubuntuVersion_raw(): Promise<number[] | null> {
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
export const ubuntuVersion = await memoize(ubuntuVersion_raw, { promise: true })

/** Detect Ubuntu version using os.version() for Ubuntu based distros */
function detectUsingOsVersion() {
  if (!("version" in os && typeof os.version === "function")) {
    return null
  }

  // #46~22.04.1-Ubuntu SMP ...
  const osVersion: string = os.version()
  const versionSplitted = osVersion.split(".")
  const majorVersion = Number.parseInt(versionSplitted[0].replace("#", ""), 10)
  const minorVersion = Number.parseInt(versionSplitted[1].replace("~", ""), 10)
  const patchVersion = Number.parseInt(versionSplitted[2].split("-")[0], 10)

  return [majorVersion, minorVersion, patchVersion]
}
