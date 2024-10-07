import { promises } from "fs"
import { execRoot } from "admina"
import ciInfo from "ci-info"
const { GITHUB_ACTIONS } = ciInfo
import { sourceRC } from "envosman"
import type { RcOptions } from "envosman/dist/rc-file.js"
const { appendFile } = promises

/**
 * Update the alternatives for a package
 * @param name The name of the package
 * @param path The path to the binary
 * @param priority The priority of the alternative (Defaults to `40`)
 */
export async function updateAptAlternatives(name: string, path: string, priority: number = 40) {
  await execRoot("update-alternatives", ["--install", `/usr/bin/${name}`, name, path, priority.toString()])
}

/**
 * Add the update-alternatives command to the rc file
 * @param name The name of the package
 * @param path The path to the binary
 * @param rcOptions The options for the rc file to add the update-alternatives command to
 * @param priority The priority of the alternative (Defaults to `40`)
 */
export async function addUpdateAlternativesToRc(
  name: string,
  path: string,
  rcOptions: RcOptions,
  priority: number = 40,
) {
  if (GITHUB_ACTIONS) {
    await updateAptAlternatives(name, path, priority)
  } else {
    await sourceRC(rcOptions)
    await appendFile(
      rcOptions.rcPath,
      `\nif [ $UID -eq 0 ]; then update-alternatives --install /usr/bin/${name} ${name} ${path} ${priority}; fi\n`,
    )
  }
}
