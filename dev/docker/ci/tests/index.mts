import path from "path"
import { fileURLToPath } from "url"
import { execa } from "execa"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, "..", "..", "..", "..")
const testsDir = path.resolve(rootDir, "./dev/docker/ci/tests")

async function main() {
  const variants = ["base", "gcc", "llvm", "mingw"]

  const distros = ["ubuntu", "fedora", "arch"]

  let failed = false
  for (const distro of distros) {
    for (const variant of variants) {
      // eslint-disable-next-line no-await-in-loop
      const result = await testDocker(variant, distro)
      if (result !== 0) {
        failed = true
        break
      }
    }
  }

  if (failed) {
    process.exit(1)
  }
}
await main()

/**
 * Test the docker image
 * @param variant - The variant to test
 * @param distro - The distro to test
 * @returns The exit code of the test
 */
async function testDocker(variant: string, distro: string): Promise<number> {
  try {
    const image = variant === "base"
      ? `aminya/setup-cpp-${distro}:latest`
      : `aminya/setup-cpp-${distro}-${variant}:latest`
    const testConfig = path.join(testsDir, `${variant}.yml`)

    console.log(`Testing ${image} with ${testConfig} `)

    // Test the specific config
    await runContainerStructureTest(image, testConfig)

    // Test the base config
    if (variant !== "base") {
      const baseResult = await testDocker("base", distro)
      if (baseResult !== 0) {
        return baseResult
      }
    }

    return 0
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
    return 1
  }
}

async function runContainerStructureTest(image: string, testConfig: string) {
  await execa("container-structure-test", [
    "test",
    "--pull",
    "--image",
    image,
    "--config",
    testConfig,
    "--platform",
    "linux/amd64",
  ], {
    stdio: "inherit",
  })
}
