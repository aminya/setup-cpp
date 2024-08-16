import escapeSpace from "escape-path-with-spaces"
import escapeQuote from "escape-quotes"

/**
 * Escape a string for use in a shell command
 * @param valGiven The string to escape
 * @param shouldEscapeSpace Whether to escape spaces in the string
 *
 * @private
 */
export function escapeString(valGiven: string, shouldEscapeSpace: boolean = false) {
  const spaceEscaped = shouldEscapeSpace ? escapeSpace(valGiven) : valGiven
  return escapeQuote(spaceEscaped, "\"", "\\")
}
