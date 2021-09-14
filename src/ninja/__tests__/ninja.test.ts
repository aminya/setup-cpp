import { setupNinja } from "../ninja"
import { spawnSync as spawn } from "child_process"
import { setupTmpDir, cleanupTmpDir } from "../../utils/tests/test-helpers"

jest.setTimeout(100000)

describe("setup-ninja", () => {
  beforeEach(async () => {
    await setupTmpDir("setup-ninja")
  })

  afterAll(async () => {
    await cleanupTmpDir("setup-ninja")
  }, 100000)

  it("should setup Ninja", async () => {
    const ninjaPath = await setupNinja("1.10.2")
    expect(ninjaPath).toBeDefined()
    expect(ninjaPath).not.toHaveLength(0)

    const { status } = spawn(ninjaPath, ["--version"], {
      encoding: "utf8",
    })
    expect(status).toBe(0)
  })
})
