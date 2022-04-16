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

  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("kcov-v39")
  })

  it("should setup Kcov v39", async () => {
    const { binDir } = (await setupKcov("39", directory, "")) as InstallationInfo
    await testBin("kcov", ["--version"], binDir)
  })

  // it("should find Kcov in the cache", async () => {
  //   const binDir = await testKcov("v39", directory)
  //   if (isGitHubCI()) {
  //     expect(binDir).toMatch(process.env.RUNNER_TOOL_CACHE ?? "hostedtoolcache")
  //   }
  //   await cleanupTmpDir("kcov-v39")
  // })

  it("should setup Kcov v38", async () => {
    const directory2 = await setupTmpDir("kcov-v38")

    await setupKcov("38", directory2, "")

    expect(which.sync("kcov", { nothrow: true })).toBeTruthy()

    await testBin("kcov", ["--version"], "usr/local/bin") // because of cmake --install

    await cleanupTmpDir("kcov-v38")
  })

  afterAll(async () => {
    await cleanupTmpDir("kcov-v38")
  })
})
