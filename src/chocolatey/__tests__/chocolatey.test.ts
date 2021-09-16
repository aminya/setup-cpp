import { InstallationInfo } from "../../utils/setup/setupBin"
import { testBin } from "../../utils/tests/test-helpers"
import { setupChocolatey } from "../chocolatey"

jest.setTimeout(200000)
describe("setup-chocolatey", () => {
  it("should setup chocolatey", async () => {
    if (process.platform !== "win32") {
      return
    }
    const { binDir } = (await setupChocolatey("", "", "")) as InstallationInfo
    await testBin("choco", ["--version"], binDir)
  })
})
