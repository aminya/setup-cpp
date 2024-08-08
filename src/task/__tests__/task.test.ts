import { GITHUB_ACTIONS } from "ci-info"
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../versions/versions"
import { setupTask } from "../task"

jest.setTimeout(300000)
describe("setup-task", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("task")
    process.env.CACHE_TOOLS = "true"
  })

  it("should setup task", async () => {
    const { binDir } = await setupTask(getVersion("task", "true"), directory, process.arch)

    await testBin("task", ["--version"], binDir)
  })

  it("should find task in the cache", async () => {
    const { binDir } = await setupTask(getVersion("task", "true"), directory, process.arch)
    if (GITHUB_ACTIONS) {
      expect(binDir).toMatch(process.env.RUNNER_TOOL_CACHE ?? "hostedtoolcache")
    }
  })

  afterEach(async () => {
    await cleanupTmpDir("task")
  }, 100000)
})
