import { find, downloadTool, cacheDir } from "@actions/tool-cache"
import { addPath, group, startGroup, endGroup } from "@actions/core"
import { join } from "path"
import { existsSync } from "fs"
import * as hasha from "hasha"
import { tmpdir } from "os"

/** A type that describes a package */
export type PackageInfo = {
  /** Url to download the package */
  url: string
  /** The top folder name once it is extracted. It can be `""` if there is no top folder */
  extractedFolderName: string
  /** The relative directory in which the binary is located. It can be `""` if the exe is in the top folder */
  binRelativeDir: string
  /** The function to extract the downloaded archive. It can be `undefined`, if the binary itself is downloaded directly. */
  extractFunction?: {
    (url: string, outputPath: string): Promise<string>
  }
}

/** A function that downloads and installs a tool. Then it caches it in the tool-cache. */
export async function setupBin(
  name: string,
  version: string,
  getPackageInfo: (version: string, platform: NodeJS.Platform) => PackageInfo
): Promise<string> {
  // Build artifact name
  const binName = process.platform === "win32" ? `${name}.exe` : name

  // Restore from cache (if found).
  const dir = find(name, version)
  if (dir) {
    addPath(dir)
    return join(dir, binName)
  }

  const { url, binRelativeDir, extractedFolderName, extractFunction } = getPackageInfo(version, process.platform)

  // Get an unique output directory name from the URL.
  const key: string = await hasha.async(url)
  const workDir = join(process.env.RUNNER_TEMP ?? tmpdir(), key)

  /** The directory which the tool is installed to */
  const binDir = join(workDir, extractedFolderName, binRelativeDir)

  if (!existsSync(workDir)) {
    await group(`Download and extract ${name}`, async () => {
      const downloaded = await downloadTool(url)
      await extractFunction?.(downloaded, workDir)
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
