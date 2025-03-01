import fastGlob from "fast-glob"
const { glob } = fastGlob
import path from "path"
import { execa } from "execa"

async function main() {
  const testFiles = await glob("./dev/docker/ci/*.yml")
  const results = await Promise.all(testFiles.map(async (testFile) => {
    try {
      // the image name
      const image = `setup-cpp-${path.basename(testFile, ".yml")}`

      // check if the image exists
      const imageExists = await execa("docker", ["images", "-q", image])
      if (imageExists.exitCode !== 0 || imageExists.stdout.trim() === "") {
        console.log(`Image ${image} does not exist`)
        return 2
      }

      await execa("container-structure-test", ["test", "--image", image, "--config", testFile], {
        stdio: "inherit",
      })
      return 0
    } catch (error) {
      console.error(error.message)
      return 1
    }
  }))

  if (results.some((result) => result === 1)) {
    process.exit(1)
  }
}

await main()
