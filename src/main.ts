import * as core from "@actions/core"
import { setupCmake } from "./cmake/cmake"
import { setupNinja } from "./ninja/ninja"

function maybeGetInput(key: string) {
  const value = core.getInput(key)
  if (value !== "false" && value !== "") {
    return value
  }
  return undefined
}

export async function main(): Promise<number> {
  try {
    // setup cmake
    const cmakeVersion = maybeGetInput("cmake")
    if (cmakeVersion !== undefined) {
      await setupCmake(cmakeVersion)
    }

    // setup ninja
    const ninjaVersion = maybeGetInput("ninja")
    if (ninjaVersion !== undefined) {
      await setupNinja(ninjaVersion)
    }
  } catch (err) {
    core.error(err as string | Error)
    core.setFailed("install-cpp failed")
    return 1
  }

  core.info("install-cpp succeeded")
  return 0
}

main()
  .then((ret) => {
    process.exitCode = ret
  })
  .catch((error) => {
    core.error("main() failed!")
    core.error(error as string | Error)
    process.exitCode = 1
  })
