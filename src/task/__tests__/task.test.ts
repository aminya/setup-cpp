import { setupTask } from "../task"
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { isGitHubCI } from "../../utils/env/isci"

jest.setTimeout(300000)
describe("setup-task", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("task")
  })

  it("should setup task", async () => {
    const { binDir } = await setupTask("3.10.0", directory, process.arch)

    await testBin("task", ["--version"], binDir)
  })

  it("should find task in the cache", async () => {
    const { binDir } = await setupTask("3.10.0", directory, process.arch)
    if (isGitHubCI()) {
      expect(binDir).toMatch("hostedtoolcache")
    }
  })

  afterEach(async () => {
    await cleanupTmpDir("task")
  }, 100000)
})
