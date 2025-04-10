import { info } from "ci-log"
import { hasAptGet } from "setup-apt"
import { ubuntuVersion } from "../../utils/env/ubuntu_version.js"
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupInfer } from "../infer.js"

jest.setTimeout(300000)

describe("setup-infer", () => {
  if (process.platform === "win32" || (process.platform === "linux" && process.arch === "arm64")) {
    it("should skip infer tests on Windows and Linux arm64", () => {
      expect(true).toBe(true)
    })
    return
  }

  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("infer")
    process.env.CACHE_TOOLS = "true"
  })

  it("should setup infer", async () => {
    /* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
    if (hasAptGet() && (await ubuntuVersion())?.[0]! <= 20) {
      info("Skipping infer test on ubuntu 20 and below")
      return
    }

    const { binDir } = await setupInfer({
      version: getVersion("infer", "true"),
      setupDir: directory,
      arch: process.arch,
    })
    await testBin("infer", ["--version"], binDir)
  })

  afterAll(async () => {
    await cleanupTmpDir("infer")
  }, 100000)
})
