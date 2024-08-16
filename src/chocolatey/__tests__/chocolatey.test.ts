import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupChocolatey } from "../chocolatey.js"

jest.setTimeout(300000)
describe("setup-chocolatey", () => {
  if (process.platform !== "win32") {
    it.skip("should setup chocolatey", () => {})
    return
  }
  it("should setup chocolatey", async () => {
    const { binDir } = (await setupChocolatey("", "", process.arch)) as InstallationInfo
    await testBin("choco", ["--version"], binDir)
  })
})
