import { setupCmake } from "../cmake"
import { spawnSync as spawn } from "child_process"
import { setupTmpDir, cleanupTmpDir } from "../../utils/tests/test-helpers"
import { addBinExtension } from "../../utils/setup/setupBin"
import { join } from "path"

jest.setTimeout(100000)

describe("setup-cmake", () => {
  let directory: string
  beforeEach(async () => {
    directory = await setupTmpDir("setup-cmake")
  })

  afterAll(async () => {
    await cleanupTmpDir("setup-cmake")
  }, 100000)

  it("should setup CMake", async () => {
    const { binDir } = await setupCmake("3.20.2", directory)
    expect(binDir).toBeDefined()
    expect(binDir).not.toHaveLength(0)

    const cmakeBin = join(binDir, addBinExtension("cmake"))

    const { status, error } = spawn(cmakeBin, ["--version"], {
      encoding: "utf8",
    })
    expect(error).toBeUndefined()
    expect(status).toBe(0)
  })
})
