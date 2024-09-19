import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupInfer } from "../infer.js"

jest.setTimeout(300000)

describe("setup-infer", () => {
  if (process.platform === "win32") {
    return
  }

  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("infer")
    process.env.CACHE_TOOLS = "true"
  })

  it("should setup infer", async () => {
    const { binDir } = await setupInfer(getVersion("infer", "true"), directory, process.arch)
    await testBin("infer", ["--version"], binDir)
  })

  afterAll(async () => {
    await cleanupTmpDir("infer")
  }, 100000)
})
