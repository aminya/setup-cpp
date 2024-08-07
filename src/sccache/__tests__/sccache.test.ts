import type { InstallationInfo } from "../../utils/setup/setupBin"
import { testBin } from "../../utils/tests/test-helpers"
import { setupSccache } from "../sccache"

jest.setTimeout(300000)
describe("setup-sccache", () => {
  it("should setup sccache", async () => {
    const installInfo = await setupSccache("", "", process.arch)

    await testBin("sccache", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
