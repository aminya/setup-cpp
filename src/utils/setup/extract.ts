import { exec } from "@actions/exec"
import { mkdirP } from "@actions/io"
export { extractTar, extractXar, extract7z, extractZip } from "@actions/tool-cache"

export async function extractExe(file: string, dest: string) {
  const exit = await exec("7z", ["x", file, `-o${dest}`])
  if (exit !== 0) {
    throw new Error(`Failed to extract ${file} to ${dest} with 7z`)
  }
  return dest
}

export async function extractTarByExe(file: string, dest: string, flags = ["--strip-components=1"]) {
  try {
    await mkdirP(dest)
  } catch {
    // ignore
  }
  const exit = await exec("tar", ["xf", file, "-C", dest, ...flags])
  if (exit !== 0) {
    throw new Error(`Failed to extract ${file} to ${dest} with tar`)
  }
  return dest
}
