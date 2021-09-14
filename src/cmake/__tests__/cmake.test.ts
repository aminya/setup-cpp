import * as process from "process"
import * as path from "path"
import * as io from "@actions/io"
import { setupCmake } from "../cmake"
import { spawnSync as spawn } from "child_process"
import { tmpdir } from "os"

jest.setTimeout(30 * 1000)

const tempDirectory = path.join(tmpdir(), "setup-cpp", "setup-cmake")

describe("setup-cmake", () => {
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
      console.log("Failed to remove test directories")
    }
  }, 100000)

  it("should download CMake", async () => {
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
