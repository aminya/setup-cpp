import { testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../versions/versions"
import { setupCppcheck } from "../cppcheck"

jest.setTimeout(300000)
describe("setup-cppcheck", () => {
  it("should setup cppcheck", async () => {
    // TODO: choco fails abnormally on windows
    if (process.platform !== "win32") {
      const installInfo = await setupCppcheck(getVersion("cppcheck", undefined), "", process.arch)

      await testBin("cppcheck", ["--version"], installInfo.binDir)
    }
  })
})
