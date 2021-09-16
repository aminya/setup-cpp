import { setupConan } from "../conan"
import { testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"

jest.setTimeout(200000)
describe("setup-conan", () => {
  it("should setup conan", async () => {
    const installInfo = await setupConan("", "", "")

    await testBin("conan", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
