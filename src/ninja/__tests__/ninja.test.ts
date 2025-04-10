import ciInfo from "ci-info"
const { GITHUB_ACTIONS } = ciInfo
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupNinja } from "../ninja.js"

jest.setTimeout(300000)
async function testNinja(directory: string) {
  const { binDir } = await setupNinja({ version: getVersion("ninja", "true"), setupDir: directory, arch: process.arch })
  await testBin("ninja", ["--version"], binDir)
  return binDir
}

describe("setup-ninja", () => {
  let directory: string
  beforeEach(async () => {
    directory = await setupTmpDir("ninja")
    process.env.CACHE_TOOLS = "true"
  })

  it("should setup Ninja", async () => {
    await testNinja(directory)
  })

  it("should find Ninja in the cache", async () => {
    const binDir = await testNinja(directory)
    if (GITHUB_ACTIONS) {
      expect(binDir).toMatch(process.env.RUNNER_TOOL_CACHE ?? "hostedtoolcache")
    }
  })

  afterEach(async () => {
    await cleanupTmpDir("ninja")
  }, 100000)
})
