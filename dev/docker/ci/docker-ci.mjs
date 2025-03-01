import { readFile, writeFile } from "fs/promises"

async function main() {
  const names = ["ubuntu-llvm", "arch-llvm", "fedora-llvm", "ubuntu-mingw", "arch-mingw", "fedora-mingw"]
  await Promise.all(
    names.map(async (name) => {
      const dockerFileContent = await readFile(`./dev/docker/setup-cpp/setup-cpp-${name}.dockerfile`, "utf-8")
      const modifiedDockerFile = dockerFileContent
        // load the externally built setup-cpp
        .replace(/FROM (.*)/g, `FROM $1\n\nCOPY "./dist/legacy" "/usr/lib/setup-cpp/"`)
        .replace("setup-cpp ", "node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.js ")
        // remove the npm install line
        .replace(/# install setup-cpp\n\s*npm install -g setup-cpp.*\n/, "")

      // write the new file in dev/docker/ci
      await writeFile(`./dev/docker/ci/${name}.dockerfile`, modifiedDockerFile)
    }),
  )
}

await main()
