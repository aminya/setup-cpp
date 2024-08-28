import { tmpdir } from "os"
import { join } from "path"
import { execRoot, execRootSync } from "admina"
import { warning } from "ci-log"
import { DownloaderHelper } from "node-downloader-helper"
import { pathExists } from "path-exists"
import { installAptPack } from "./install.js"

export type AddAptKeyOptions = KeyServerOptions | KeyUrl

/**
 * Add an apt key
 * @param options The options for adding the key
 * @returns The file name of the key that was added or `undefined` if it failed
 *
 * @example
 * ```ts
 * await addAptKey({ key: "3B4FE6ACC0B21F32" fileName: "bazel-archive-keyring.gpg"})
 * ```
 *
 * @example
 * ```ts
 * await addAptKey({ keyUrl: "https://bazel.build/bazel-release.pub.gpg", fileName: "bazel-archive-keyring.gpg"})
 * ```
 */
export function addAptKey(options: AddAptKeyOptions) {
  if ("keyUrl" in options) {
    return addAptKeyViaURL(options)
  } else {
    return addAptKeyViaServer(options)
  }
}

type GpgKeyOptions = {
  /**
   * The file name for the key (should end in `.gpg`)
   */
  fileName: string
  /**
   * The key store path (Defaults to `/etc/apt/trusted.gpg.d`)
   */
  keyStorePath?: string
}

export const defaultKeyStorePath = "/etc/apt/trusted.gpg.d"

export type KeyServerOptions = {
  /**
   * The key to add
   *
   * @example
   * ```ts
   * "3B4FE6ACC0B21F32"
   * ```
   */
  key: string
  /**
   * The keyserver to use (Defaults to `keyserver.ubuntu.com`)
   */
  keyServer?: string
} & GpgKeyOptions

export const defaultKeyServer = "keyserver.ubuntu.com"

/**
 * Add an apt key via a keyserver
 * @returns The file name of the key that was added or `undefined` if it failed
 */
export async function addAptKeyViaServer(
  { key, keyServer = defaultKeyServer, fileName, keyStorePath = defaultKeyServer }: KeyServerOptions,
) {
  try {
    assertGpgFileName(fileName)
    const filePath = join(keyStorePath, fileName)
    if (!(await pathExists(filePath))) {
      initGpg()

      await execRoot("gpg", [
        "--no-default-keyring",
        "--keyring",
        `gnupg-ring:${filePath}`,
        "--keyserver",
        keyServer,
        "--recv-keys",
        key,
      ])
      await execRoot("chmod", ["644", filePath])
    }
    return filePath
  } catch (err) {
    warning(`Failed to add apt key via server ${keyServer}: ${err}`)
    return undefined
  }
}

export type KeyUrl = {
  /**
   * The URL to download the key from
   */
  keyUrl: string
} & GpgKeyOptions

/**
 * Add an apt key via a download
 * @param options The options for adding the key
 * @returns The file name of the key that was added
 */
export async function addAptKeyViaURL({ keyUrl, fileName, keyStorePath = defaultKeyStorePath }: KeyUrl) {
  try {
    assertGpgFileName(fileName)
    const filePath = join(keyStorePath, fileName)
    if (!(await pathExists(filePath))) {
      initGpg()

      await installAptPack([{ name: "ca-certificates" }])

      const dlPath = join(tmpdir(), fileName)
      const dl = new DownloaderHelper(keyUrl, tmpdir(), { fileName })
      dl.on("error", (err) => {
        throw new Error(`Failed to download ${keyUrl}: ${err}`)
      })
      await dl.start()

      execRootSync("gpg", [
        "--no-default-keyring",
        "--keyring",
        `gnupg-ring:${filePath}`,
        "--import",
        dlPath,
      ])
      execRootSync("chmod", ["644", filePath])
    }
    return filePath
  } catch (err) {
    warning(`Failed to add apt key via download ${keyUrl}: ${err}`)
    return undefined
  }
}

function initGpg() {
  execRootSync("gpg", ["-k"])
}

function assertGpgFileName(fileName: string) {
  if (!fileName.endsWith(".gpg")) {
    throw new Error(`Key file name must end with .gpg: ${fileName}`)
  }
}
