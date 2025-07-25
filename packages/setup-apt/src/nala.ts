import { tmpdir } from "os"
import { dirname, join } from "path"
import { execRootSync } from "admina"
import { error, info } from "ci-log"
import { readFile, writeFile } from "fs/promises"
import { DownloaderHelper } from "node-downloader-helper"
import which from "which"
import { hasAptGet, hasNala } from "./get-apt.js"
import { installAptPack } from "./install.js"
import { qualifiedNeededAptPackage } from "./qualify-install.js"

let binDir: string | undefined

export type SetupOptions = {
  version: string
  setupDir: string
  arch: string
}

export async function setupNala({ version }: Partial<Pick<SetupOptions, "version">> = {}) {
  if (!hasAptGet()) {
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
  try {
    const nalaPack = await qualifiedNeededAptPackage({ name: "nala", version })
    if (nalaPack !== undefined) {
      await installAptPack([{ name: nalaPack }])
      return { binDir }
    }
  } catch (err) {
    // ignore
    info(`Failed to install nala: ${err}`)
  }

  // Nala is not available in the default repositories
  // Check if the legacy version is available
  try {
    const nalaLegacyPack = await qualifiedNeededAptPackage({ name: "nala-legacy" })
    if (nalaLegacyPack !== undefined) {
      await installAptPack([{ name: nalaLegacyPack }], true)
      return { binDir }
    }
  } catch (err) {
    // ignore
    info(`Failed to install nala-legacy: ${err}`)
  }

  // Install via the installer script
  await setupNalaViaInstaller()

  return { binDir }
}

async function setupNalaViaInstaller() {
  // https://gitlab.com/volian/volian-archive
  const installer = new DownloaderHelper(
    "https://gitlab.com/volian/volian-archive/-/raw/1939afc3f80638dca2bbedde74bbd86731703cc8/install-nala.sh",
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

  await installAptPack([{ name: "wget" }])

  try {
    execRootSync("bash", [installerPath])
  } catch (err) {
    error(`Failed to install nala via installer: ${err}`)
    execRootSync("apt", ["install", "-y", "-t", "nala", "nala"])
  }
}

export function bashWithNala(script: string) {
  if (hasNala()) {
    return `apt-get() { nala $@; }; export -f apt-get; ${script}; unset -f apt-get`
  }
  return script
}
