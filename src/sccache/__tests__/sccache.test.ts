import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupSccache } from "../sccache.js"

jest.setTimeout(300000)
describe("setup-sccache", () => {
  if (process.platform === "linux" && process.arch === "arm64") {
    it("should skip sccache tests on Linux arm64", () => {
      expect(true).toBe(true)
    })
    return
  }

  it("should setup sccache", async () => {
    const installInfo = await setupSccache("", "", process.arch)

    await testBin("sccache", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
