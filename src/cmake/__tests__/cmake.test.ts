import { setupCmake } from "../cmake"
import { spawnSync as spawn } from "child_process"
import { setupTmpDir, cleanupTmpDir } from "../../utils/tests/test-helpers"

jest.setTimeout(100000)

describe("setup-cmake", () => {
  beforeEach(async () => {
    await setupTmpDir("setup-cmake")
  })

  afterAll(async () => {
    await cleanupTmpDir("setup-cmake")
  }, 100000)

  it("should setup CMake", async () => {
    const cmakePath = await setupCmake("3.20.2")
    expect(cmakePath).toBeDefined()
    expect(cmakePath).not.toHaveLength(0)

    const { status, error } = spawn(cmakePath, ["--version"], {
      encoding: "utf8",
    })
    expect(error).toBeUndefined()
    expect(status).toBe(0)
  })
})
