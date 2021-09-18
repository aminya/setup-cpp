import { addPath as ghAddPath } from "@actions/core"
import { delimiter } from "path"
import * as core from "@actions/core"

/** An add path function that works locally or inside GitHub Actions */
export function addPath(path: string) {
  try {
    ghAddPath(path)
  } catch (err) {
    core.error(err as Error)
    core.error(`Failed to add ${path} to the percistent PATH. You should add it manually.`)
    process.env.PATH = `${path}${delimiter}${process.env.PATH}`
    // TODO shell out to add path
  }
}
