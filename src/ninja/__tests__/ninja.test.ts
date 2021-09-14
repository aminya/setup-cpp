import { setupNinja } from "../ninja"
import { spawnSync as spawn } from "child_process"
import { setupTmpDir, cleanupTmpDir } from "../../utils/tests/test-helpers"
import { addBinExtension } from "../../utils/setup/setupBin"
import { join } from "path"

jest.setTimeout(100000)

describe("setup-ninja", () => {
  let directory: string
  beforeEach(async () => {
    directory = await setupTmpDir("setup-ninja")
  })

  afterAll(async () => {
    await cleanupTmpDir("setup-ninja")
  }, 100000)

  it("should setup Ninja", async () => {
    const ninjaPath = await setupNinja("1.10.2", directory)
    expect(ninjaPath).toBeDefined()
    expect(ninjaPath).not.toHaveLength(0)

    const ninjaBin = join(ninjaPath, addBinExtension("ninja"))

    const { status } = spawn(ninjaBin, ["--version"], {
      encoding: "utf8",
    })
    expect(status).toBe(0)
  })
})
