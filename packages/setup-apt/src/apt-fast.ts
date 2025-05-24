import { tmpdir } from "os"
import { dirname, join } from "path"
import { execRootSync } from "admina"
import { error } from "ci-log"
import { readFile, writeFile } from "fs/promises"
import { DownloaderHelper } from "node-downloader-helper"
import which from "which"
import { hasAptGet } from "./get-apt.js"
import { installAptPack } from "./install.js"

let binDir: string | undefined

export async function setupAptFast() {
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
  const depP = installAptPack([{ name: "bash" }, { name: "wget" }])

  // https://github.com/ilikenwf/apt-fast
  const installer = new DownloaderHelper(
    "https://raw.githubusercontent.com/ilikenwf/apt-fast/c2cd0a0420d3f2d647dc82cf749bfd58c4697dac/quick-install.sh",
    tmpdir(),
    { fileName: "install-apt-fast.sh" },
  )
  installer.on("error", (err) => {
    throw new Error(`Failed to download install-apt-fast.sh: ${err}`)
  })
  await installer.start()

  const installerPath = join(tmpdir(), "install-apt-fast.sh")

  // Patch the installer script to not use sudo explicitly
  let script = await readFile(installerPath, "utf8")
  script = script
    .replace(/sudo/g, "")
    .replace(
      "https://raw.githubusercontent.com/ilikenwf/apt-fast/master",
      "https://raw.githubusercontent.com/Rongronggg9/apt-fast/ac82051792f764220e5e303d4560de0f1952826b",
    )

  await writeFile(installerPath, script)

  await depP

  try {
    execRootSync("bash", [installerPath])
  } catch (err) {
    error(`Failed to install apt-fast via installer: ${err}`)
  }

  // Update the apt-fast config
  const aptFastConfigPath = "/etc/apt-fast.conf"
  let aptFastConfig = await readFile(aptFastConfigPath, "utf8")

  // enable default suggested configs
  const opts = ["_APTMGR", "DOWNLOADBEFORE"]
  for (const opt of opts) {
    aptFastConfig = aptFastConfig.replace(new RegExp(`^#\\s*${opt}`, "m"), opt)
  }

  // write the config using execRootSync
  const tempAptFast = join(tmpdir(), "apt-fast.conf")
  await writeFile(tempAptFast, aptFastConfig)
  execRootSync("mv", [tempAptFast, aptFastConfigPath])
}
