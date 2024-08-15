import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupCcache } from "../ccache.js"

jest.setTimeout(300000)
describe("setup-ccache", () => {
  it("should setup ccache", async () => {
    const installInfo = await setupCcache("", "", process.arch)

    await testBin("ccache", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
