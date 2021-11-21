/** Add bin extension to a binary. This will be `.exe` on Windows. */
export function addBinExtension(name: string) {
  if (process.platform === "win32") {
    return `${name}.exe`
  }
  return name
}

/** Add native shell extension. This will be `.bat` on Windows and `sh` on unix. */
export function addShellExtension(name: string) {
  if (process.platform === "win32") {
    return `${name}.bat`
  }
  return `${name}.sh`
}
