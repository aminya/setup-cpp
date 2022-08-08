/**
 * Add bin extension to the given binary name.
 *
 * @param name The name you want to add the shell extension to
 * @param win_ext `.exe` on Windows
 * @param unix_ext `""` On unix.
 */
export function addBinExtension(name: string, win_ext = ".exe", unix_ext = "") {
  if (process.platform === "win32") {
    return `${name}${win_ext}`
  }
  return `${name}${unix_ext}`
}

/**
 * Add native shell extension to the given name
 *
 * @param name The name you want to add the shell extension to
 * @param win_ext `.bat` on Windows
 * @param unix_ext `.sh` On unix.
 */
export function addShellExtension(name: string, win_ext = ".bat", unix_ext = ".sh") {
  if (process.platform === "win32") {
    return `${name}${win_ext}`
  }
  return `${name}${unix_ext}`
}

/** Prefix a `./` for unix shell and nothing for the cmd shell */
export function addShellHere(name: string) {
  if (process.platform === "win32") {
    return name
  }
  return `./${name}`
}
