import { dirname } from "path"
import which from "which"
import { isUbuntu } from "../utils/env/isUbuntu"
import { execSudo } from "../utils/exec/sudo"
import { setupAptPack } from "../utils/setup/setupAptPack"

let binDir: string | undefined

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function setupNala(version: string, _setupDir: string, _arch: string) {
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
  execSudo("/bin/bash", [
    "-c",
    `echo "deb http://deb.volian.org/volian/ scar main" | tee /etc/apt/sources.list.d/volian-archive-scar-unstable.list`,
  ])
  setupAptPack("wget")
  execSudo("/bin/bash", [
    "-c",
    `wget -qO - https://deb.volian.org/volian/scar.key | tee /etc/apt/trusted.gpg.d/volian-archive-scar-unstable.gpg > /dev/null`,
  ])

  if (version !== "legacy") {
    setupAptPack("nala", undefined, [], true)
  } else {
    setupAptPack("nala-legacy", undefined, [], true)
  }

  binDir = "/usr/bin"

  return { binDir }
}
