import { mkdir, readFile, readdir, writeFile } from "fs/promises"
import he from "he"
import { DownloaderHelper } from "node-downloader-helper"
import JsonStringify from "safe-stable-stringify"
import { saveGitHubAssetList } from "../utils/github/fetch-assets.ts"
import { compareVersion } from "../utils/setup/version.ts"

/**
 * Generate the list of all releases of a GitHub repository and save it to a json file
 */
async function main() {
  // https://github.com/llvm/llvm-project/releases
  await saveGitHubAssetList(
    "llvm",
    "llvm-project",
    "./src/llvm/github_llvm_llvm-project.json",
    isAssetArchive,
  )

  // go through https://releases.llvm.org/x.y.z and get all the assets
  await fetchLLVMOrgReleases()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

function isAssetArchive(asset: string): boolean {
  return asset.endsWith("tar.xz")
    || asset.endsWith("zip")
    || asset.endsWith("exe")
    || asset.endsWith("tar.gz")
}

async function fetchLLVMOrgReleases() {
  const assetHTMLDir = "./src/llvm/assets/"

  await fetchIndexFiles(assetHTMLDir)

  const assets: Record<string, string[]> = await extractAssetsFromHTML(assetHTMLDir)

  // sort the assets by version
  const jsonStringify = JsonStringify.configure({
    deterministic: compareVersion,
  })

  // write the assets to a json file
  const data = jsonStringify(assets, null, 2)
  await writeFile("./src/llvm/llvm_org_releases.json", data)
}

async function fetchIndexFiles(assetHTMLDir: string) {
  const promises: Promise<void>[] = []

  await mkdir(assetHTMLDir, { recursive: true })

  for (let major = 1; major <= 9; major++) {
    for (let minor = 0; minor <= 9; minor++) {
      for (let patch = 0; patch <= 9; patch++) {
        promises.push(fetchIndexFile(major, minor, patch, assetHTMLDir))
      }
    }
  }
  await Promise.all(promises)
  return assetHTMLDir
}

async function fetchIndexFile(major: number, minor: number, patch: number, assetHTMLDir: string) {
  try {
    const version = `${major}.${minor}.${patch}`

    const dl = new DownloaderHelper(
      `https://releases.llvm.org/${version}`,
      assetHTMLDir,
      {
        fileName: `${version}.html`,
        override: {
          skip: true,
        },
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

async function extractAssetsFromHTML(assetHTMLDir: string) {
  const assets: Record<string, string[]> = {}

  const linkRegex = /href="([^"]+)"/g // match all href in the html

  const indexFiles = await readdir(assetHTMLDir)
  await Promise.all(indexFiles.map(async (indexFile) => {
    const version = indexFile.replace(".html", "")
    if (!(version in assets)) {
      assets[version] = []
    }

    // read the html file
    const body = await readFile(`${assetHTMLDir}/${indexFile}`, "utf8")

    // parse the html via regex
    let match: RegExpExecArray | null
    // biome-ignore lint/suspicious/noAssignInExpressions: ignore
    while ((match = linkRegex.exec(body)) !== null) {
      const asset = match[1]

      if (isAssetArchive(asset)) {
        assets[version].push(he.decode(asset))
      }
    }

    if (assets[version].length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete assets[version]
    }
  }))

  return assets
}
