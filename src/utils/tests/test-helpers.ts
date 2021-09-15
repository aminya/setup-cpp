import * as io from "@actions/io"
import { tmpdir } from "os"
import * as path from "path"
import { spawnSync as spawn } from "child_process"
import { addBinExtension } from "../setup/setupBin"
import { join } from "path"

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

export function testBin(binName: string, binDir: string) {
  expect(binDir).toBeDefined()
  expect(binDir).not.toHaveLength(0)

  const cmakeBin = join(binDir, addBinExtension(binName))

  const { status } = spawn(cmakeBin, ["--version"], {
    encoding: "utf8",
  })
  expect(status).toBe(0)

  return binDir
}
