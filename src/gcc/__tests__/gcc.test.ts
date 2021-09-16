import { InstallationInfo } from "../../utils/setup/setupBin"
import { testBin } from "../../utils/tests/test-helpers"
import { setupGcc } from "../gcc"

jest.setTimeout(200000)
describe("setup-gcc", () => {
  it("should setup gcc", async () => {
    const installInfo = await setupGcc("", "", "")

    await testBin("g++", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
