import { tmpdir } from "os"
import { execRoot, execRootSync } from "admina"
import { warning } from "ci-log"
import { DownloaderHelper } from "node-downloader-helper"
import { pathExists } from "path-exists"

function initGpg() {
  execRootSync("gpg", ["-k"])
}

/**
 * Add an apt key via a keyserver
 * @param keys The keys to add
 * @param name The name of the key
 * @param server The keyserver to use (Defaults to `keyserver.ubuntu.com`)
 * @returns The file name of the key that was added or `undefined` if it failed
 */
export async function addAptKeyViaServer(keys: string[], name: string, server = "keyserver.ubuntu.com") {
  try {
    const fileName = `/etc/apt/trusted.gpg.d/${name}`
    if (!(await pathExists(fileName))) {
      initGpg()

      await Promise.all(
        keys.map(async (key) => {
          await execRoot("gpg", [
            "--no-default-keyring",
            "--keyring",
            `gnupg-ring:${fileName}`,
            "--keyserver",
            server,
            "--recv-keys",
            key,
          ])
          await execRoot("chmod", ["644", fileName])
        }),
      )
    }
    return fileName
  } catch (err) {
    warning(`Failed to add apt key via server ${server}: ${err}`)
    return undefined
  }
}

/**
 * Add an apt key via a download
 * @param name The name of the key
 * @param url The URL of the key
 * @returns The file name of the key that was added
 */
export async function addAptKeyViaDownload(name: string, url: string) {
  const fileName = `/etc/apt/trusted.gpg.d/${name}`
  if (!(await pathExists(fileName))) {
    initGpg()

    const dl = new DownloaderHelper(url, tmpdir(), { fileName: name })
    dl.on("error", (err) => {
      throw new Error(`Failed to download ${url}: ${err}`)
    })
    await dl.start()

    execRootSync("gpg", ["--no-default-keyring", "--keyring", `gnupg-ring:${fileName}`, "--import", `/tmp/${name}`])
    execRootSync("chmod", ["644", fileName])
  }
  return fileName
}
