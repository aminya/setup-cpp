// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import escape from "escape-path-with-spaces"

/// Escape the spaces in the given path
export function escapeSpace(path: string | undefined): string {
  if (path === undefined) {
    return ""
  }
  return escape(path)
}
