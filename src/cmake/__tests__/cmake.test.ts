import { setupCmake } from "../cmake"
import { setupTmpDir, cleanupTmpDir, testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(300000)

describe("setup-cmake", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("cmake")
  })

  it("should setup CMake", async () => {
    const { binDir } = await setupCmake("3.20.2", directory, "")
    await testBin("cmake", ["--version"], binDir)
  })

  it("should find CMake in the cache", async () => {
    const { binDir } = await setupCmake("3.20.2", directory, "")
    await testBin("cmake", ["--version"], binDir)
    expect(binDir.includes("ToolCache")).toBeTruthy()
  })

  afterAll(async () => {
    await cleanupTmpDir("cmake")
  }, 100000)
})
