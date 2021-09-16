import { setupCppcheck } from "../cppcheck"
import { testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"

jest.setTimeout(200000)
describe("setup-cppcheck", () => {
  it("should setup cppcheck", async () => {
    const installInfo = await setupCppcheck("", "", "")

    await testBin("cppcheck", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
