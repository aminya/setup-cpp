import { setupBrew } from "../brew"
import { testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"

jest.setTimeout(200000)
describe("setup-brew", () => {
  it("should setup brew", async () => {
    if (process.platform !== "darwin") {
      return
    }
    const installInfo = setupBrew("", "", "")
    await testBin("brew", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
