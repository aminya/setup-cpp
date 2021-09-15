const { exec } = require("@actions/exec")

function getPlatformName() {
  switch (process.platform) {
    case "win32": {
      return "windows"
    }
    case "darwin": {
      return "mac"
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
      exec(
        `./node_modules/.bin/caxa --input ./dist --output ./exe/setup_cpp_${getPlatformName()}${exe} -- "{{caxa}}/node_modules/.bin/node${exe}" "{{caxa}}/main.js"`
      )
    )
  )
}

main().then((exit) => {
  process.exit(exit)
})
