import { setupTask } from "../task"
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import ciDetect from "@npmcli/ci-detect"
import { getVersion } from "../../default_versions"

jest.setTimeout(300000)
describe("setup-task", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("task")
  })

  it("should setup task", async () => {
    const { binDir } = await setupTask(getVersion("task", "true"), directory, process.arch)

    await testBin("task", ["--version"], binDir)
  })

  it("should find task in the cache", async () => {
    const { binDir } = await setupTask(getVersion("task", "true"), directory, process.arch)
    if (ciDetect() === "github") {
      expect(binDir).toMatch(process.env.RUNNER_TOOL_CACHE ?? "hostedtoolcache")
    }
  })

  afterEach(async () => {
    await cleanupTmpDir("task")
  }, 100000)
})
