import { setupNinja } from "../ninja"
import { setupTmpDir, cleanupTmpDir, testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(200000)
async function testNinja(directory: string) {
  const { binDir } = await setupNinja("1.10.2", directory, "")
  await testBin("ninja", ["--version"], binDir)
  return binDir
}

describe("setup-ninja", () => {
  let directory: string
  beforeEach(async () => {
    directory = await setupTmpDir("setup-ninja")
  })

  it("should setup Ninja", async () => {
    await testNinja(directory)
  })

  it("should find Ninja in the cache", async () => {
    const binDir = await testNinja(directory)
    expect(binDir.includes("ToolCache")).toBeTruthy()
  })

  afterEach(async () => {
    await cleanupTmpDir("setup-ninja")
  }, 100000)
})
