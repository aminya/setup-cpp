import * as core from "@actions/core"
import { setupCmake } from "./cmake/cmake"

export async function main(): Promise<number> {
  try {
    // setup cmake
    const cmakeVersion = core.getInput("cmake")
    if (cmakeVersion !== "false" && cmakeVersion !== "") {
      await setupCmake(cmakeVersion)
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
