import { existsSync } from "fs"
import { join } from "path"
import { mkdir, readFile, readdir, writeFile } from "fs/promises"
import { DownloaderHelper } from "node-downloader-helper"
import JsonStringify from "safe-stable-stringify"
import { compareVersion } from "../setup/version.ts"

type Options = {
  /**
   * The directory to download the HTML files
   */
  htmlDownloadDir: string
  /**
   * The path to write the output json file
   */
  path: string
  /**
   * A generator that returns the version and the URL of the asset to download
   *
   * The generator should return a tuple of the version and the URL
   */
  getAssetVersionAndURL: () => Generator<[string, string], void, unknown>
  /**
   * Filter the assets
   */
  filterAssets?: (asset: string) => boolean
}

/**
 * Save the assets of the HTML files to a json file
 *
 * The assets are extracted from the href of the html files
 */
export async function saveHTMLAssets(opts: Options) {
  await fetchIndexFiles(opts)

  const assets: Record<string, string[]> = await extractAssetsFromHTML(opts)

  // sort the assets by version
  const jsonStringify = JsonStringify.configure({
    deterministic: compareVersion,
  })

  // write the assets to a json file
  const data = jsonStringify(assets, null, 2)
  await writeFile(opts.path, data)
}

async function fetchIndexFiles(opts: Options) {
  const promises: Promise<void>[] = []

  await mkdir(opts.htmlDownloadDir, { recursive: true })

  for (const [version, url] of opts.getAssetVersionAndURL()) {
    promises.push(fetchIndexFile(version, url, opts.htmlDownloadDir))
  }

  await Promise.all(promises)
}

async function fetchIndexFile(version: string, url: string, htmlDownloadDir: string) {
  try {
    if (existsSync(join(htmlDownloadDir, version))) {
      return
    }

    const dl = new DownloaderHelper(
      url,
      htmlDownloadDir,
      {
        fileName: `${version}.html`,
        override: {
          skip: true,
        },
        timeout: 500,
      },
    )
    dl.on("start", () => {
      console.log(`Downloading ${version}`)
    })
    dl.on("error", (err) => {
      console.error(`Failed to download ${version}.html: ${err}`)
    })
    await dl.start()
  } catch (err) {
    console.error(err)
  }
}

async function extractAssetsFromHTML(opts: Options) {
  const assets: Record<string, string[]> = {}

  const linkRegex = /href="([^"]+)"/g // match all href in the html

  const indexFiles = await readdir(opts.htmlDownloadDir)
  await Promise.all(indexFiles.map(async (indexFile) => {
    const version = indexFile.replace(".html", "")

    const versionAssets: string[] = []

    // read the html file
    const body = await readFile(`${opts.htmlDownloadDir}/${indexFile}`, "utf8")

    // parse the html via regex
    let match: RegExpExecArray | null
    // biome-ignore lint/suspicious/noAssignInExpressions: ignore
    while ((match = linkRegex.exec(body)) !== null) {
      const asset = match[1]

      if (opts.filterAssets !== undefined && !opts.filterAssets(asset)) {
        continue
      }

      versionAssets.push(asset.replace("%2B", "+"))
    }

    if (versionAssets.length !== 0) {
      // sort the names and update the assets
      assets[version] = versionAssets.sort().reverse()
    }
  }))

  return assets
}
