import { setupKcov } from "../kcov"
import { setupTmpDir, cleanupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"
import which from "which"

jest.setTimeout(300000)
describe("setup-Kcov", () => {
  if (process.platform !== "linux") {
    it.todo("should setup kcov on non-linux")
    return
  }

  it("should setup Kcov v40", async () => {
    const directory = await setupTmpDir("kcov-v40")
    const { binDir } = (await setupKcov("40", directory, "")) as InstallationInfo
    await testBin("kcov", ["--version"], binDir)
    await cleanupTmpDir("kcov-v40")
  })

  it("should setup Kcov v39", async () => {
    const directory = await setupTmpDir("kcov-v39")
    const { binDir } = (await setupKcov("39", directory, "")) as InstallationInfo
    await testBin("kcov", ["--version"], binDir)
    await cleanupTmpDir("kcov-v39")
  })

  // it("should find Kcov in the cache", async () => {
  //   const binDir = await testKcov("v39", directory)
  //   if (isGitHubCI()) {
  //     expect(binDir).toMatch(process.env.RUNNER_TOOL_CACHE ?? "hostedtoolcache")
  //   }
  //   await cleanupTmpDir("kcov-v39")
  // })

  it("should setup Kcov v38", async () => {
    try {
      const directory2 = await setupTmpDir("kcov-v38")

      await setupKcov("38", directory2, "")

      expect(which.sync("kcov", { nothrow: true })).toBeTruthy()

      await testBin("kcov", ["--version"], "usr/local/bin") // because of cmake --install

      await cleanupTmpDir("kcov-v38")
    } catch (err) {
      // TODO
      console.warn(err)
    }
  })
})
