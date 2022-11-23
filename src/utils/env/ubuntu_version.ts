import { warning } from "ci-log"
import { getUbuntuVersion } from "ubuntu-version"
import which from "which"
import { setupAptPack } from "../setup/setupAptPack"
import { isUbuntu } from "./isUbuntu"

export async function ubuntuVersion(): Promise<number[] | null> {
  try {
    if (isUbuntu()) {
      if (which.sync("lsb_release", { nothrow: true }) === null) {
        await setupAptPack([{ name: "lsb-release" }])
      }
      const versionSplitted = await getUbuntuVersion()

      if (versionSplitted.length === 0) {
        warning("Failed to get the ubuntu major version.")
        return null
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
