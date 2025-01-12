/* eslint-disable import/no-extraneous-dependencies */
import { execaNode } from "execa"

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

async function main() {
  const exe = process.platform === "win32" ? ".exe" : ""

  await execaNode("./node_modules/caxa/build/index.mjs", [
    "--input",
    "./dist/modern",
    "--output",
    `./exe/setup-cpp-${process.arch}-${getPlatformName()}${exe}`,
    "--",
    `{{caxa}}/node_modules/.bin/node${exe}`,
    "{{caxa}}/setup-cpp.mjs",
  ])
}

main().catch((err) => {
  throw err
})
