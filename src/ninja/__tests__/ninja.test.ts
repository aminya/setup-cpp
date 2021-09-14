import * as process from "process"
import * as path from "path"
import * as io from "@actions/io"
import { setupNinja } from "../ninja"
import { spawnSync as spawn } from "child_process"
import { tmpdir } from "os"

const tempDirectory = path.join(tmpdir(), "setup-cpp", "setup-ninja")

jest.setTimeout(30 * 1000)

describe("setup-ninja", () => {
  beforeEach(async () => {
    await io.rmRF(tempDirectory)
    await io.mkdirP(tempDirectory)
    process.env.INPUT_DESTINATION = tempDirectory
    process.env.GITHUB_WORKSPACE = tempDirectory
    process.env.RUNNER_TEMP = path.join(tempDirectory, "temp")
    process.env.RUNNER_TOOL_CACHE = path.join(tempDirectory, "tempToolCache")
  })

  afterAll(async () => {
    try {
      await io.rmRF(tempDirectory)
    } catch {
      console.error("Failed to remove test directories")
    }
  }, 100000)

  it("should fetch Ninja 1.10.2", async () => {
    const ninjaPath = await setupNinja("1.10.2")
    expect(ninjaPath).toBeDefined()
    expect(ninjaPath).not.toHaveLength(0)

    const { status } = spawn(ninjaPath, ["--version"], {
      encoding: "utf8",
    })
    expect(status).toBe(0)
  })
})
