import * as core from "@actions/core"

export async function main(): Promise<number> {
  try {
    // TODO
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
    core.error("main() failed!", error)
    process.exitCode = 1
  })
