import { setupMake } from "../make"
import { testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"

jest.setTimeout(300000)
describe("setup-make", () => {
  it("should setup make", async () => {
    const installInfo = await setupMake("", "", process.arch)

    await testBin("make", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
