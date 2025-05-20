import { tmpdir } from "os"
import { dirname, join } from "path"
import { execRootSync } from "admina"
import { error } from "ci-log"
import { readFile, writeFile } from "fs/promises"
import { DownloaderHelper } from "node-downloader-helper"
import which from "which"
import { hasAptGet } from "../utils/env/hasAptGet.js"

let binDir: string | undefined

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupAptFast(_version: string, _setupDir: string, _arch: string) {
  if (!hasAptGet()) {
    return undefined
  }
  if (typeof binDir === "string") {
    return { binDir }
  }

  const maybeBinDir = which.sync("apt-fast", { nothrow: true })
  if (maybeBinDir !== null) {
    binDir = dirname(maybeBinDir)
    return { binDir }
  }

  binDir = "/usr/bin" // eslint-disable-line require-atomic-updates

  // Install via the installer script
  await setupAptFastViaInstaller()

  return { binDir }
}

async function setupAptFastViaInstaller() {
  const installer = new DownloaderHelper(
    "https://git.io/vokNn",
    tmpdir(),
    { fileName: "install-apt-fast.sh" },
  )
  installer.on("error", (err) => {
    throw new Error(`Failed to download install-apt-fast.sh: ${err}`)
  })
  await installer.start()

  const installerPath = join(tmpdir(), "install-apt-fast.sh")

  // Patch the installer script to not use sudo explicitly
  const script = await readFile(installerPath, "utf8")
  await writeFile(installerPath, script.replace(/sudo/g, ""))

  try {
    execRootSync("bash", [installerPath])
  } catch (err) {
    error(`Failed to install apt-fast via installer: ${err}`)
    execRootSync("apt", ["install", "-y", "-t", "apt-fast", "apt-fast"])
  }
}
