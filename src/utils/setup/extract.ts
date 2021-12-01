import * as execa from "execa"
import { mkdirP } from "@actions/io"
export { extractTar, extractXar, extract7z, extractZip } from "@actions/tool-cache"

export async function extractExe(file: string, dest: string) {
  await execa.execa("7z", ["x", file, `-o${dest}`])
  return dest
}

export async function extractTarByExe(file: string, dest: string, flags = ["--strip-components=1"]) {
  try {
    await mkdirP(dest)
  } catch {
    // ignore
  }
  await execa.execa("tar", ["xf", file, "-C", dest, ...flags])
  return dest
}
