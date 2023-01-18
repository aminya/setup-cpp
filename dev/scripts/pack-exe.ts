/* eslint-disable import/no-extraneous-dependencies */
import { node } from "execa"

function getPlatformName() {
  switch (process.platform) {
    case "win32": {
      return "windows"
    }
    case "darwin": {
      return "macos"
    }
    default: {
      return process.platform
    }
  }
}

function main() {
  let exes
  if (process.platform === "win32") {
    exes = [".exe"]
  } else if (process.platform === "darwin") {
    exes = [""]
  } else {
    exes = [""]
  }

  return Promise.all(
    exes.map((exe) =>
      node("./node_modules/caxa/build/index.mjs", [
        "--input",
        "./dist/node16",
        "--output",
        `./exe/setup-cpp-${process.arch}-${getPlatformName()}${exe}`,
        "--",
        `{{caxa}}/node_modules/.bin/node${exe}`,
        `{{caxa}}/setup-cpp.js`,
      ])
    )
  )
}

main().catch((err) => {
  throw err
})
