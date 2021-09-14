import * as io from "@actions/io"
import { tmpdir } from "os"
import * as path from "path"

export async function setupTmpDir(testName: string) {
  const tempDirectory = path.join(tmpdir(), "setup-cpp", testName)

  await io.rmRF(tempDirectory)
  await io.mkdirP(tempDirectory)
  process.env.INPUT_DESTINATION = tempDirectory
  process.env.GITHUB_WORKSPACE = tempDirectory
  process.env.RUNNER_TEMP = path.join(tempDirectory, "temp")
  process.env.RUNNER_TOOL_CACHE = path.join(tempDirectory, "tempToolCache")

  return tempDirectory
}

export async function cleanupTmpDir(testName: string) {
  const tempDirectory = path.join(tmpdir(), "setup-cpp", testName)

  try {
    await io.rmRF(tempDirectory)
  } catch {
    console.log("Failed to remove test directories")
  }
}
