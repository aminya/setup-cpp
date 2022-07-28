import { dirname } from "path"
import which from "which"
import { isUbuntu } from "../utils/env/isUbuntu"
import { execSudo } from "../utils/exec/sudo"
import { setupAptPack } from "../utils/setup/setupAptPack"

let binDir: string | undefined

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupNala(version: string, _setupDir: string, _arch: string) {
  if (!isUbuntu()) {
    return undefined
  }
  if (typeof binDir === "string") {
    return { binDir }
  }

  const maybeBinDir = which.sync("nala", { nothrow: true })
  if (maybeBinDir !== null) {
    binDir = dirname(maybeBinDir)
    return { binDir }
  }

  // https://github.com/volitank/nala#-installation
  await setupAptPack("wget")
  execSudo("/bin/bash", [
    "-c",
    `wget -qO - https://deb.volian.org/volian/scar.key | tee /etc/apt/trusted.gpg.d/volian-archive-scar-unstable.gpg > /dev/null`,
  ])
  execSudo("/bin/bash", [
    "-c",
    `echo "deb http://deb.volian.org/volian/ scar main" | tee /etc/apt/sources.list.d/volian-archive-scar-unstable.list`,
  ])

  try {
    if (version !== "legacy") {
      await setupAptPack("nala", undefined, [], true)
    } else {
      await setupAptPack("nala-legacy", undefined, [], true)
    }
  } catch (err) {
    await setupAptPack("nala-legacy", undefined, [], true)
  }

  binDir = "/usr/bin" // eslint-disable-line require-atomic-updates

  return { binDir }
}
