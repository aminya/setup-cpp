/// Escape the spaces in the given path
export function escapeSpace(path: string | undefined): string {
  if (path === undefined) {
    return ""
  }
  if (process.platform === "win32") {
    return path.replace(/(\s+)/g, "%20")
  } else {
    return path.replace(/(\s+)/g, "\\$1")
  }
}
