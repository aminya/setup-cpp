import { tmpdir } from "os"
import * as io from "@actions/io"
import spawn from "cross-spawn"
import * as path from "patha"
import { addExeExt, join } from "patha"

import { pathExists } from "path-exists"

export async function setupTmpDir(testName: string) {
  const tempDirectory = path.join(tmpdir(), "setup cpp temp", testName)
  try {
    await io.rmRF(tempDirectory)
    await io.mkdirP(tempDirectory)
  } catch {
    console.log("Failed to remove test directories")
  }
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

export async function testBin(
  name: string,
  args: string[] | null = ["--version"],
  binDir: string | undefined = undefined,
) {
  try {
    let bin = name
    if (typeof binDir === "string") {
      console.log(`Testing the existence of ${binDir}`)
      expect(binDir).toBeDefined()
      expect(binDir).not.toHaveLength(0)
      expect(await pathExists(binDir)).toBeTruthy()
      bin = join(binDir, addExeExt(name))
    }

    if (args !== null) {
      console.log(`Running ${bin} ${args.join(" ")}`)
      const { status } = spawn.sync(bin, args, { stdio: "inherit" })
      expect(status).toBe(0)
    }

    expect((await io.which(name, true)).includes(bin))
  } catch (err) {
    throw new Error(`Failed to test bin ${name}: ${err}`)
  }
}

export function runnerWindowsVersion() {
  if (process.platform !== "win32") {
    return undefined
  }
  const maybeVersionString = process.env.RUNNER_OS_NAME?.split("-")[1]
  if (maybeVersionString === undefined) {
    return undefined
  }

  return Number.parseInt(maybeVersionString, 10)
}
