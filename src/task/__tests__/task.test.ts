import ciInfo from "ci-info"
const { GITHUB_ACTIONS } = ciInfo
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupTask } from "../task.js"

jest.setTimeout(300000)
describe("setup-task", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("task")
    process.env.CACHE_TOOLS = "true"
  })

  it("should setup task", async () => {
    const { binDir } = await setupTask({ version: getVersion("task", "true"), setupDir: directory, arch: process.arch })

    await testBin("task", ["--version"], binDir)
  })

  it("should find task in the cache", async () => {
    const { binDir } = await setupTask({ version: getVersion("task", "true"), setupDir: directory, arch: process.arch })
    if (GITHUB_ACTIONS) {
      expect(binDir).toMatch(process.env.RUNNER_TOOL_CACHE ?? "hostedtoolcache")
    }
  })

  afterEach(async () => {
    await cleanupTmpDir("task")
  }, 100000)
})
