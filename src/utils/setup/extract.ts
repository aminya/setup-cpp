import { basename, dirname, join } from "path"
import { grantUserWriteAccess } from "admina"
import { info, warning } from "ci-log"
import { execa } from "execa"
import { mkdirp, move, readdir, remove, stat } from "fs-extra"
import which from "which"
import { setupSevenZip } from "../../sevenzip/sevenzip.js"
import { setupTar } from "../../tar/tar.js"
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
    case ArchiveType.TarXz:
      return process.platform === "win32" ? extract7Zip : extractTarByExe
    case ArchiveType.Zip:
      return extractZip
    default:
      return extract7Zip
  }
}

let sevenZip: string | undefined

/// Extract 7z using 7z
export async function extract7Zip(file: string, dest: string, stripComponents: boolean = false) {
  const name = basename(file)

  if (/.*\.tar\..+$/.test(name)) {
    await extractTarXzBy7zip(file, name, dest, stripComponents)
  } else {
    // extract the 7z file directly
    await run7zip(file, dest)
  }

  return dest
}

async function extractTarXzBy7zip(file: string, name: string, dest: string, stripComponents: boolean) {
  if (!/.*\.tar\..+$/.test(name)) {
    throw new Error(`Invalid tar file: ${name}`)
  }
  // extract the compression first
  const tarDir = dirname(file)
  await run7zip(file, tarDir)
  // extract the tar
  const tarName = name.slice(0, -3)
  const tarFile = join(tarDir, tarName)
  await run7zip(tarFile, tarDir)
  await remove(tarFile)
  // move the extracted files to the destination
  const folderName = tarName.slice(0, -4)
  const folderPath = join(tarDir, folderName)
  info(`Moving ${folderPath} to ${dest}`)
  await move(folderPath, dest, { overwrite: true })

  if (stripComponents) {
    await stripPathComponents(dest, folderName)
  }
}

async function stripPathComponents(dest: string, folderName: string) {
  // get all subfolders in the folder
  const subFolders = await readdir(join(dest, folderName))
  await Promise.all(
    subFolders.map(async (subFolder) => {
      const subFolderPath = join(dest, subFolder)
      if (!(await stat(subFolderPath)).isDirectory()) {
        // if the subfolder is not a directory, do nothing
        return
      }
      // for each subfolder, move all files to the destination
      const subFiles = await readdir(subFolderPath)
      await Promise.all(
        subFiles.map((subFile) => {
          return move(join(subFolderPath, subFile), join(dest, subFile), { overwrite: true })
        }),
      )
      // remove the subfolder
      await remove(subFolderPath)
      return
    }),
  )
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
  await setupTar("", "", process.arch)

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
