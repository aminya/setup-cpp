import { setupKcov } from "../kcov"
import { setupTmpDir, cleanupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"

jest.setTimeout(300000)
async function testKcov(version: string, directory: string) {
  const { binDir } = (await setupKcov(version, directory, "")) as InstallationInfo
  await testBin("kcov", ["--version"], binDir)
  return binDir
}

describe("setup-Kcov", () => {
  if (process.platform !== "linux") {
    it.todo("should setup kcov on non-linux")
    return
  }

  it("should setup Kcov v39", async () => {
    const directory = await setupTmpDir("kcov-v39")
    await testKcov("v39", directory)
    await cleanupTmpDir("kcov-v39")
  })

  // TODO
  // it("should setup Kcov v38", async () => {
  //   const directory = await setupTmpDir("kcov-v38")
  //   await testKcov("v38", directory)
  //   await cleanupTmpDir("kcov-v39")
  // })

  // it("should find Kcov in the cache", async () => {
  //   const directory = await setupTmpDir("kcov-v39")
  //   const binDir = await testKcov("v39", directory)
  //   expect(binDir.includes("hostedtoolcache")).toBeTruthy()
  //   await cleanupTmpDir("kcov-v39")
  // })
})
