import * as io from "@actions/io"
import { tmpdir } from "os"
import * as path from "path"

export async function setupTmpDir(testName: string) {
  const tempDirectory = path.join(tmpdir(), "setup-cpp", testName)

  await io.rmRF(tempDirectory)
  await io.mkdirP(tempDirectory)
  process.env.SETUP_CPP_DIR = tempDirectory
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
