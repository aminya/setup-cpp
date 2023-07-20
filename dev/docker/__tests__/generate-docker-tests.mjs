import { readFile, writeFile } from "fs/promises"

async function main() {
  const dockerFiles = ["ubuntu", "arch", "fedora", "ubuntu-mingw", "arch-mingw", "fedora-mingw"]
  await Promise.all(
    dockerFiles.map(async (dockerFile) => {
      const dockerFileContent = await readFile(`./dev/docker/setup-cpp-${dockerFile}.dockerfile`, "utf-8")
      const builderExample = await readFile(`./dev/docker/${dockerFile}.dockerfile`, "utf-8")

      const modifiedDockerFile = dockerFileContent
        // load the externally built setup-cpp
        .replace(/FROM (.*)/g, `FROM $1\n\nCOPY "./dist/legacy" "/usr/lib/setup-cpp/"`)
        .replace("setup-cpp ", "node /usr/lib/setup-cpp/setup-cpp.js ")
        // remove the npm install line
        .replace(/# install setup-cpp\n\s*npm install -g setup-cpp.*/, "")

      // concat the two files
      const newDockerFileContent = `${modifiedDockerFile}\n${builderExample}`

      // write the new file in dev/docker/__tests__
      await writeFile(`./dev/docker/__tests__/${dockerFile}.dockerfile`, newDockerFileContent)
    })
  )
}

await main()
