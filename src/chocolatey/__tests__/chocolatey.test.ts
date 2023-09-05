import { InstallationInfo } from "../../utils/setup/setupBin"
import { testBin } from "../../utils/tests/test-helpers"
import { setupChocolatey } from "../chocolatey"

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
