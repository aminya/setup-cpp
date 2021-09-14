import { extractZip, find, downloadTool, cacheFile } from "@actions/tool-cache"
import { addPath, group, startGroup, endGroup } from "@actions/core"
import { join } from "path"
import { existsSync } from "fs"
import * as hasha from "hasha"
import { tmpdir } from "os"

/** Get the platform name Ninja uses in their download links */
function getNinjaPlatform(platform: NodeJS.Platform) {
  switch (platform) {
    case "win32":
      return "win"
    case "darwin":
      return "mac"
    case "linux":
      return "linux"
    default:
      throw new Error(`Unsupported platform '${platform}'`)
  }
}

export async function setupNinja(version: string): Promise<string> {
  const platform = getNinjaPlatform(process.platform)

  // Build artifact name
  const ninjaBin = platform === "win" ? "ninja.exe" : "ninja"

  // Restore from cache (if found).
  const ninjaDir = find("ninja", version)
  if (ninjaDir) {
    addPath(ninjaDir)
    return join(ninjaDir, ninjaBin)
  }

  const url = `https://github.com/ninja-build/ninja/releases/download/v${version}/ninja-${platform}.zip`

  // Get an unique output directory name from the URL.
  const key: string = await hasha.async(url)
  const finalDir = join(process.env.RUNNER_TEMP ?? tmpdir(), key)

  const finalBinPath = join(finalDir, ninjaBin)

  if (!existsSync(finalDir)) {
    await group("Download and extract ninja", async () => {
      const downloaded = await downloadTool(url)
      await extractZip(downloaded, finalDir)
    })
  }

  try {
    startGroup("Add ninja to PATH")
    addPath(finalDir)
  } finally {
    endGroup()
  }

  await cacheFile(finalBinPath, ninjaBin, "ninja", version)

  return finalBinPath
}
