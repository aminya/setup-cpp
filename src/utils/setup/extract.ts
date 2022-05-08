import execa from "execa"
import { mkdirP, mv } from "@actions/io"
import which from "which"
import { setupSevenZip } from "../../sevenzip/sevenzip"
import { warning } from "../io/io"
import { extractZip as tcExtractZip } from "@actions/tool-cache"
export { extractTar, extractXar, extract7z } from "@actions/tool-cache"

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

  await execa(sevenZip, ["x", file, `-o${dest}`], { stdio: "inherit" })
  return dest
}

export async function extractTarByExe(file: string, dest: string, flags = ["--strip-components=0"]) {
  try {
    await mkdirP(dest)
  } catch {
    // ignore
  }

  // TODO windows fails to create symlinks
  // https://github.com/heroku/heroku-slugs/issues/3

  try {
    await execa("tar", ["xf", file, "-C", dest, ...flags], { stdio: "inherit" })
  } catch (e) {
    if (process.platform === "win32" && (e as Error).message.includes("Can't create '\\\\?\\C:")) {
      warning(`Failed to extract symlink ${file} to ${dest}. Ignoring this symlink.`)
    }
  }

  return dest
}

export async function extractZip(file: string, dest?: string): Promise<string> {
  if (!file) {
    throw new Error("parameter 'file' is required")
  }

  let filePath = file
  if (process.platform === "win32") {
    filePath = `${file}.zip`
    mv(file, filePath)
  }

  return tcExtractZip(filePath, dest)
}
