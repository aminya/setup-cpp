import { readFile, writeFile } from "fs/promises"

async function main() {
  const dockerFiles = ["ubuntu", "arch", "fedora"]
  await Promise.all(
    dockerFiles.map(async (dockerFile) => {
      const dockerFileContent = await readFile(`./dev/docker/setup-cpp-${dockerFile}.dockerfile`, "utf-8")
      const builderExample = await readFile(`./dev/docker/${dockerFile}.dockerfile`, "utf-8")

      // after the first FROM, add COPY "./dist/legacy" "/"
      const modifiedDockerFile = dockerFileContent
        .replace(/FROM (.*)/g, `FROM $1\n\nCOPY "./dist/legacy" "/usr/lib/setup-cpp/"`)
        .replace("setup-cpp ", "node /usr/lib/setup-cpp/setup-cpp.js ")

      // concat the two files
      const newDockerFileContent = `${modifiedDockerFile}\n${builderExample}`

      // write the new file in dev/docker/__tests__
      await writeFile(`./dev/docker/__tests__/${dockerFile}.dockerfile`, newDockerFileContent)
    })
  )
}

await main()
