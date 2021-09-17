import { setupDoxygen } from "../doxygen"
import { testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"

jest.setTimeout(300000)
describe("setup-doxygen", () => {
  it("should setup doxygen", async () => {
    const installInfo = await setupDoxygen("", "", process.arch)

    await testBin("doxygen", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
