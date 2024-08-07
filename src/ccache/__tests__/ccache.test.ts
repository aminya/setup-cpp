import type { InstallationInfo } from "../../utils/setup/setupBin"
import { testBin } from "../../utils/tests/test-helpers"
import { setupCcache } from "../ccache"

jest.setTimeout(300000)
describe("setup-ccache", () => {
  it("should setup ccache", async () => {
    const installInfo = await setupCcache("", "", process.arch)

    await testBin("ccache", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
