import { tmpdir } from "os"
import { execRootSync } from "admina"
import { readFile, writeFile } from "fs/promises"
import { DownloaderHelper } from "node-downloader-helper"
import { dirname, join } from "patha"
import { hasNala, installAptPack, qualifiedNeededAptPackage } from "setup-apt"
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

  binDir = "/usr/bin" // eslint-disable-line require-atomic-updates

  // If nala is available in the default repositories, install it
  const nalaPack = await qualifiedNeededAptPackage({ name: "nala", version })
  if (nalaPack !== undefined) {
    await installAptPack([{ name: nalaPack }])
    return { binDir }
  }

  // Nala is not available in the default repositories
  // Check if the legacy version is available
  const nalaLegacyPack = await qualifiedNeededAptPackage({ name: "nala-legacy" })
  if (nalaLegacyPack !== undefined) {
    await installAptPack([{ name: nalaLegacyPack }], true)
    return { binDir }
  }

  // Install via the installer script
  await setupNalaViaInstaller()

  return { binDir }
}

async function setupNalaViaInstaller() {
  const installer = new DownloaderHelper(
    "https://gitlab.com/volian/volian-archive/-/raw/main/install-nala.sh",
    tmpdir(),
    { fileName: "install-nala.sh" },
  )
  installer.on("error", (err) => {
    throw new Error(`Failed to download install-nala.sh: ${err}`)
  })
  await installer.start()

  const installerPath = join(tmpdir(), "install-nala.sh")

  // Patch the installer script to not use sudo explicitly
  const script = await readFile(installerPath, "utf8")
  await writeFile(installerPath, script.replace(/sudo/g, ""))

  execRootSync("bash", [installerPath])
}

export function bashWithNala(script: string) {
  if (hasNala()) {
    return `apt-get() { nala $@; }; export -f apt-get; ${script}; unset -f apt-get`
  }
  return script
}
