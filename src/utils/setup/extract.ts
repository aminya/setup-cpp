import { mkdirP } from "@actions/io"
import { grantUserWriteAccess } from "admina"
import { warning } from "ci-log"
import { execa } from "execa"
import which from "which"
import { setupSevenZip } from "../../sevenzip/sevenzip"
export { extractTar, extractXar } from "@actions/tool-cache"

let sevenZip: string | undefined

/// Extract 7z using 7z
export async function extract7Zip(file: string, dest: string) {
  await execa(await getSevenZip(), ["x", file, `-o${dest}`, "-y"], { stdio: "inherit" })
  await grantUserWriteAccess(dest)
  return dest
}

/// install 7z if needed
async function getSevenZip() {
  if (sevenZip === undefined) {
    if (which.sync("7z", { nothrow: true }) === null) {
      await setupSevenZip("", "", process.arch)
    }
    // eslint-disable-next-line require-atomic-updates
    sevenZip = "7z"
  }
  return sevenZip
}

/// Extract Exe using 7z
export function extractExe(file: string, dest: string) {
  return extract7Zip(file, dest)
}

/// Extract Zip using 7z
export function extractZip(file: string, dest: string) {
  return extract7Zip(file, dest)
}

export async function extractTarByExe(file: string, dest: string, stripComponents: number = 0, flags: string[] = []) {
  try {
    await mkdirP(dest)
  } catch {
    // ignore
  }

  // TODO windows fails to create symlinks
  // https://github.com/heroku/heroku-slugs/issues/3

  try {
    await execa("tar", ["xf", file, "-C", dest, `--strip-components=${stripComponents}`, ...flags], {
      stdio: "inherit",
    })
  } catch (e) {
    if (process.platform === "win32" && (e as Error).message.includes("Can't create '\\\\?\\C:")) {
      warning(`Failed to extract symlink ${file} to ${dest}. Ignoring this symlink.`)
    }
  }

  await grantUserWriteAccess(dest)
  return dest
}
