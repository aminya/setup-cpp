import { setupCmake } from "../cmake"
import { setupTmpDir, cleanupTmpDir, testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(100000)

async function testCmake(directory: string) {
  const { binDir } = await setupCmake("3.20.2", directory)
  testBin("cmake", binDir)
  return binDir
}

describe("setup-cmake", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("setup-cmake")
  })

  it("should setup CMake", async () => {
    await testCmake(directory)
  })

  it("should find CMake in the cache", async () => {
    const binDir = await testCmake(directory)
    expect(binDir.includes("ToolCache")).toBeTruthy()
  })

  afterAll(async () => {
    await cleanupTmpDir("setup-cmake")
  }, 100000)
})
