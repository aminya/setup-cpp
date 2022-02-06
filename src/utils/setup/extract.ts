import execa from "execa"
import { mkdirP } from "@actions/io"
import which from "which"
import { setupSevenZip } from "../../sevenzip/sevenzip"
export { extractTar, extractXar, extract7z, extractZip } from "@actions/tool-cache"

let sevenZip: string | undefined

export async function extractExe(file: string, dest: string) {
  // install 7z if needed
  if (sevenZip === undefined) {
    if (which.sync("7z", { nothrow: true }) === null) {
      await setupSevenZip("", "", process.arch)
    }
    // eslint-disable-next-line require-atomic-updates
    sevenZip = "7z"
  }

  await execa(sevenZip, ["x", file, `-o${dest}`])
  return dest
}

export async function extractTarByExe(file: string, dest: string, flags = ["--strip-components=0"]) {
  try {
    await mkdirP(dest)
  } catch {
    // ignore
  }
  await execa("tar", ["xf", file, "-C", dest, ...flags])
  return dest
}
