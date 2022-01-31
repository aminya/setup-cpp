import { setupTask } from "../task"
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"

jest.setTimeout(300000)
describe("setup-task", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("task")
  })

  it("should setup task", async () => {
    const installInfo = await setupTask("3.10.0", directory, process.arch)

    await testBin("task", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })

  it("should find task in the cache", async () => {
    const installInfo = await setupTask("3.10.0", directory, process.arch)
    expect((installInfo as InstallationInfo | undefined)?.binDir.includes("hostedtoolcache")).toBeTruthy()
  })

  afterEach(async () => {
    await cleanupTmpDir("task")
  }, 100000)
})
