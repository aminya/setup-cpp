import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupBazel } from "../bazel.js"

jest.setTimeout(300000)
describe("setup-bazel", () => {
  if (process.platform === "linux" && process.arch === "arm64") {
    it("should skip bazel tests on Linux arm64", () => {
      expect(true).toBe(true)
    })
    return
  }
  it("should setup bazel", async () => {
    const installInfo = await setupBazel({ version: "", setupDir: "", arch: process.arch })

    await testBin("bazel", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
