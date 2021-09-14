import { find, downloadTool, cacheDir } from "@actions/tool-cache"
import { addPath, group, startGroup, endGroup } from "@actions/core"
import { join, basename } from "path"
import { existsSync } from "fs"
import * as hasha from "hasha"
import { tmpdir } from "os"
import { URL } from "url"

export type PackageInfo = {
  url: string
  binRelativeDir: string
  extractFunction: {
    (url: string, outputPath: string): Promise<string>
  }
  dropSuffix: string
}

/** A function that downloads and installs a tool. Then it caches it in the tool-cache. */
export async function setupBin(
  name: string,
  version: string,
  getPlatformData: (version: string, platform: NodeJS.Platform) => PackageInfo
): Promise<string> {
  // Build artifact name
  const binName = process.platform === "win32" ? `${name}.exe` : name

  // Restore from cache (if found).
  const dir = find(name, version)
  if (dir) {
    addPath(dir)
    return join(dir, binName)
  }

  const { url, dropSuffix, binRelativeDir: binRelativePath, extractFunction } = getPlatformData(version, process.platform)

  // Get an unique output directory name from the URL.
  const key: string = await hasha.async(url)
  const workDir = join(process.env.RUNNER_TEMP ?? tmpdir(), key)

  const { pathname } = new URL(url)
  const dirName = basename(pathname)

  /** The directory which the tool is installed to */
  const binDir = join(workDir, dirName.replace(dropSuffix, ""), binRelativePath)

  if (!existsSync(workDir)) {
    await group(`Download and extract ${name}`, async () => {
      const downloaded = await downloadTool(url)
      await extractFunction(downloaded, workDir)
    })
  }

  try {
    startGroup(`Add ${name} to PATH`)
    addPath(binDir)
  } finally {
    endGroup()
  }

  await cacheDir(workDir, name, version)

  return join(binDir, binName)
}
