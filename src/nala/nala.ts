import { execRootSync } from "admina"
import { dirname } from "patha"
import { addAptKeyViaDownload, hasNala, installAptPack } from "setup-apt"
import which from "which"
import { isUbuntu } from "../utils/env/isUbuntu.js"

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

  await installAptPack([{ name: "python3-apt" }])

  // https://gitlab.com/volian/nala/-/wikis/Installation
  const keyFileName = await addAptKeyViaDownload(
    "volian-archive-nala.gpg",
    "https://deb.volian.org/volian/nala.key",
  )
  execRootSync("/bin/bash", [
    "-c",
    `echo "deb [signed-by=${keyFileName}] http://deb.volian.org/volian/ nala main" | tee /etc/apt/sources.list.d/volian-archive-nala.list`,
  ])

  try {
    if (version !== "legacy") {
      await installAptPack([{ name: "nala" }], true)
    } else {
      await installAptPack([{ name: "nala-legacy" }], true)
    }
  } catch (err) {
    await installAptPack([{ name: "nala-legacy" }], true)
  }

  binDir = "/usr/bin" // eslint-disable-line require-atomic-updates

  return { binDir }
}

export function bashWithNala(script: string) {
  if (hasNala()) {
    return `apt-get() { nala $@; }; export -f apt-get; ${script}; unset -f apt-get`
  }
  return script
}
