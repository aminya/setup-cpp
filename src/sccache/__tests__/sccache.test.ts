import { setupSccache } from "../sccache"
import { testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"

jest.setTimeout(300000)
describe("setup-sccache", () => {
  it("should setup sccache", async () => {
    const installInfo = await setupSccache("", "", process.arch)

    await testBin("sccache", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
