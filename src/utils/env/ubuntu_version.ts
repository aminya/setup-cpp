import { getUbuntuVersion } from "ubuntu-version"
import which from "which"
import { setupAptPack } from "../setup/setupAptPack"
import { isUbuntu } from "./isUbuntu"

export async function ubuntuVersion(): Promise<number[] | null> {
  if (isUbuntu()) {
    if (which.sync("lsb_release", { nothrow: true }) === null) {
      setupAptPack("lsb-release")
    }
    const versionSplitted = await getUbuntuVersion()

    if (versionSplitted.length === 0) {
      throw new Error("Failed to get the ubuntu major version.")
    }

    return versionSplitted
  } else {
    return null
  }
}
