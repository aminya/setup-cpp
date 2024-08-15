import escapeSpace from "escape-path-with-spaces"
import escapeQuote from "escape-quotes"

export function escapeString(valGiven: string, shouldEscapeSpace: boolean = false) {
  const spaceEscaped = shouldEscapeSpace ? escapeSpace(valGiven) : valGiven
  return escapeQuote(spaceEscaped, "\"", "\\")
}
