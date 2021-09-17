import * as io from "@actions/io"
import { tmpdir } from "os"
import * as path from "path"
import { addBinExtension } from "../setup/setupBin"
import { join } from "path"
import spawn from "cross-spawn"

export async function setupTmpDir(testName: string) {
  const tempDirectory = path.join(tmpdir(), "setup-cpp", testName)
  try {
    await io.rmRF(tempDirectory)
    await io.mkdirP(tempDirectory)
  } catch {
    console.log("Failed to remove test directories")
  }
  process.env.SETUP_CPP_DIR = tempDirectory

  const toolCache = path.join(tmpdir(), "setup-cpp", "ToolCache")
  process.env.RUNNER_TOOL_CACHE = process.env.RUNNER_TOOL_CACH ?? toolCache

  return tempDirectory
}

export async function cleanupTmpDir(testName: string) {
  if (process.env.SETUP_CPP_DIR !== undefined) {
    const tempDirectory = path.join(process.env.SETUP_CPP_DIR, testName)

    try {
      await io.rmRF(tempDirectory)
    } catch {
      console.log("Failed to remove test directories")
    }
  }
}

export async function testBin(
  name: string,
  args: string[] | null = ["--version"],
  binDir: string | undefined = undefined
) {
  let bin = name
  if (typeof binDir === "string") {
    expect(binDir).toBeDefined()
    expect(binDir).not.toHaveLength(0)
    bin = join(binDir, addBinExtension(name))
  }

  if (args !== null) {
    const { status } = spawn.sync(bin, args, { stdio: "inherit" })
    expect(status).toBe(0)
  }

  expect(await io.which(name, true)).toBe(bin)
}
