import { setupCcache } from "../ccache"
import { testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"

jest.setTimeout(200000)
describe("setup-ccache", () => {
  it("should setup ccache", async () => {
    const installInfo = await setupCcache("", "", process.arch)

    await testBin("ccache", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
