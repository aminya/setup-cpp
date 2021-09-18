import { addPath as ghAddPath } from "@actions/core"
import { delimiter } from "path"
import * as core from "@actions/core"
import { exec } from "@actions/exec"

/** An add path function that works locally or inside GitHub Actions */
export async function addPath(path: string) {
  try {
    ghAddPath(path)
  } catch (err) {
    core.error(err as Error)
    switch (process.platform) {
      case "win32": {
        await exec(`setx PATH=${path};%PATH%`)
        break
      }
      case "linux":
      case "darwin": {
        await exec(`echo "export PATH=${path}:$PATH" >> ~/.profile`)
        await exec(`source ~/.profile`)
        core.info(`${path} was added to ~/.profile`)
        break
      }
      default: {
        core.error(`Failed to add ${path} to the percistent PATH. You should add it manually.`)
        process.env.PATH = `${path}${delimiter}${process.env.PATH}`
      }
    }
  }
}
