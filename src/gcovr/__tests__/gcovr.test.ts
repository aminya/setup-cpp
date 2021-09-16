import { setupGcovr } from "../gcovr"
import { testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"

jest.setTimeout(200000)
describe("setup-gcovr", () => {
  it("should setup gcovr", async () => {
    const installInfo = await setupGcovr("", "", "")
    await testBin("gcovr", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
