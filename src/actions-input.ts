import { getInput } from "@actions/core"

/** Get an object from github actions */

export function maybeGetInput(key: string) {
  const value = getInput(key.toLowerCase())
  if (value !== "false" && value !== "") {
    return value
  }
  return undefined // skip installation
}
