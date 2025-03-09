import { existsSync } from "fs"
import { join } from "path"
import { execa } from "execa"
import { getBrewBinPath, getBrewDir } from "./install.js"

export function brewPackNameAndVersion(name: string, version: string | undefined) {
  return (version !== undefined && version !== "") ? `${name}@${version}` : name
}

/**
 * Get the installation directory of a package
 * @param name The name of the package
 * @param nameAndVersion The name and version of the package
 * @returns The installation directory of the package
 */

export async function brewPackInstallDir(name: string, version: string | undefined) {
  const nameAndVersion = brewPackNameAndVersion(name, version)

  // first try with --prefix
  const nameAndVersionPrefix = await getBrewPackPrefix(nameAndVersion)
  if (nameAndVersionPrefix !== undefined) {
    return nameAndVersionPrefix
  }

  // try with --prefix name
  const namePrefix = await getBrewPackPrefix(name)
  if (namePrefix !== undefined) {
    return namePrefix
  }

  // if that fails, try with searchInstallDir
  return searchInstallDir(name, nameAndVersion)
}

async function getBrewPackPrefix(packArg: string) {
  try {
    const brewPath = getBrewBinPath()
    return (await execa(brewPath, ["--prefix", packArg], { stdio: ["pipe", "inherit", "inherit"] })).stdout
  } catch {
    return undefined
  }
}
/**
 * Searches for the installation directory of a package
 * @param name The name of the package
 * @param nameAndVersion The name and version of the package
 * @returns The installation directory of the package
 */
function searchInstallDir(name: string, nameAndVersion: string) {
  const brewDir = getBrewDir()

  // Check in opt directory (most common location)
  const nameAndVersionOptDir = join(brewDir, "opt", nameAndVersion)
  if (existsSync(nameAndVersionOptDir)) {
    return nameAndVersionOptDir
  }
  const nameOptDir = join(brewDir, "opt", name)
  if (existsSync(nameOptDir)) {
    return nameOptDir
  }

  // Check in Cellar (where casks and some formulae are installed)
  const nameAndVersionCellarDir = join(brewDir, "Cellar", nameAndVersion)
  if (existsSync(nameAndVersionCellarDir)) {
    return nameAndVersionCellarDir
  }
  const nameCellarDir = join(brewDir, "Cellar", name)
  if (existsSync(nameCellarDir)) {
    return nameCellarDir
  }

  // Check in lib directory
  const nameAndVersionLibDir = join(brewDir, "lib", nameAndVersion)
  if (existsSync(nameAndVersionLibDir)) {
    return nameAndVersionLibDir
  }
  const nameLibDir = join(brewDir, "lib", name)
  if (existsSync(nameLibDir)) {
    return nameLibDir
  }

  return undefined
}
