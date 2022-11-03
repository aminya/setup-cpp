import { setupNinja } from "../ninja"
import { setupTmpDir, cleanupTmpDir, testBin } from "../../utils/tests/test-helpers"
import ciDetect from "@npmcli/ci-detect"
import { getVersion } from "../../versions/versions"

jest.setTimeout(300000)
async function testNinja(directory: string) {
  const { binDir } = await setupNinja(getVersion("ninja", "true"), directory, process.arch)
  await testBin("ninja", ["--version"], binDir)
  return binDir
}

describe("setup-ninja", () => {
  let directory: string
  beforeEach(async () => {
    directory = await setupTmpDir("ninja")
  })

  it("should setup Ninja", async () => {
    await testNinja(directory)
  })

  it("should find Ninja in the cache", async () => {
    const binDir = await testNinja(directory)
    if (ciDetect() === "github-actions") {
      expect(binDir).toMatch(process.env.RUNNER_TOOL_CACHE ?? "hostedtoolcache")
    }
  })

  afterEach(async () => {
    await cleanupTmpDir("ninja")
  }, 100000)
})
