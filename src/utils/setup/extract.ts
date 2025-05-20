import { basename, dirname, join } from "path"
import { grantUserWriteAccess } from "admina"
import { info, warning } from "ci-log"
import { execa } from "execa"
import { mkdirp, move } from "fs-extra"
import { rm } from "fs/promises"
import { hasApk, installApkPack } from "setup-alpine"
import { hasAptGet, installAptPack } from "setup-apt"
import which from "which"
import { setupSevenZip } from "../../sevenzip/sevenzip.js"
import { hasDnf } from "../env/hasDnf.js"
import { isArch } from "../env/isArch.js"
import { setupDnfPack } from "./setupDnfPack.js"
import { setupPacmanPack } from "./setupPacmanPack.js"
export { extractTar, extractXar } from "@actions/tool-cache"

export enum ArchiveType {
  Tar = 0,
  TarGz = 1,
  TarXz = 2,
  Zip = 3,
  SevenZip = 4,
}

export function getArchiveType(file: string): ArchiveType {
  const ext = file.split(".").pop()

  if (ext === "tar") {
    return ArchiveType.Tar
  }

  if (ext === "gz" || ext === "tgz") {
    return ArchiveType.TarGz
  }

  if (ext === "xz" || ext === "txz") {
    return ArchiveType.TarXz
  }

  if (ext === "zip") {
    return ArchiveType.Zip
  }

  if (ext === "7z" || ext === "exe") {
    return ArchiveType.SevenZip
  }

  // default to 7z
  warning(`Unknown archive type: ${ext}. Defaulting to 7z`)
  return ArchiveType.SevenZip
}

export function getExtractFunction(archiveType: ArchiveType) {
  switch (archiveType) {
    case ArchiveType.Tar:
    case ArchiveType.TarGz:
      return extractTarByExe
    case ArchiveType.TarXz:
      return extractTarByExe
    case ArchiveType.Zip:
      return extractZip
    default:
      return extract7Zip
  }
}

let sevenZip: string | undefined

/// Extract 7z using 7z
export async function extract7Zip(file: string, dest: string) {
  const name = basename(file)

  if (/.*\.tar\..+$/.test(name)) {
    // if the file is tar.*, extract the compression first
    const tarDir = dirname(file)
    await run7zip(file, tarDir)
    // extract the tar
    const tarName = name.slice(0, -3)
    const tarFile = join(tarDir, tarName)
    await run7zip(tarFile, tarDir)
    await rm(tarFile)
    // Move the extracted files to the destination
    const folderName = tarName.slice(0, -4)
    const folderPath = join(tarDir, folderName)
    info(`Moving ${folderPath} to ${dest}`)
    await move(folderPath, dest, { overwrite: true })
  } else {
    // extract the 7z file directly
    await run7zip(file, dest)
  }

  return dest
}

async function run7zip(file: string, dest: string) {
  info(`7z: extracting ${file} to ${dest}`)
  await execa(await getSevenZip(), ["x", file, `-o${dest}`, "-y"], { stdio: "inherit" })
  await grantUserWriteAccess(dest)
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

/// Extract Zip using unzip or 7z
export async function extractZip(file: string, dest: string) {
  // prefer 7z if available (faster especially on Windows)
  if (which.sync("7z", { nothrow: true }) !== null) {
    return extract7Zip(file, dest)
  }

  // if unzip is available use it (usually available on posix systems)
  if (which.sync("unzip", { nothrow: true }) !== null) {
    await execa("unzip", ["-q", file, "-d", dest], { stdio: "inherit" })
    await grantUserWriteAccess(dest)
    return dest
  }

  // fallback to 7z (will install 7z if needed)
  return extract7Zip(file, dest)
}

export async function extractTarByExe(file: string, dest: string, stripComponents: number = 0, flags: string[] = []) {
  await installTarDependencies(getArchiveType(file))

  try {
    await mkdirp(dest)
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

async function installTarDependencies(archiveType: ArchiveType) {
  info("Installing tar extraction dependencies")

  switch (archiveType) {
    case ArchiveType.TarGz: {
      if (process.platform === "linux") {
        if (isArch()) {
          await setupPacmanPack("gzip")
          await setupPacmanPack("tar")
        } else if (hasDnf()) {
          await setupDnfPack([{ name: "gzip" }, { name: "tar" }])
        } else if (hasAptGet()) {
          await installAptPack([{ name: "gzip" }, { name: "tar" }])
        } else if (await hasApk()) {
          await installApkPack([{ name: "gzip" }, { name: "tar" }])
        }
      }
      break
    }
    case ArchiveType.TarXz: {
      if (process.platform === "linux") {
        if (isArch()) {
          await setupPacmanPack("xz")
          await setupPacmanPack("tar")
        } else if (hasDnf()) {
          await setupDnfPack([{ name: "xz" }, { name: "tar" }])
        } else if (hasAptGet()) {
          await installAptPack([{ name: "xz-utils" }, { name: "tar" }])
        } else if (await hasApk()) {
          await installApkPack([{ name: "xz" }, { name: "tar" }])
        }
      }
      break
    }
    default:
      throw new Error(`Unsupported archive type: ${archiveType} for tar extraction`)
  }
}
