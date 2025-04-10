import { testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupCppcheck } from "../cppcheck.js"

jest.setTimeout(300000)
describe("setup-cppcheck", () => {
  it("should setup cppcheck", async () => {
    // TODO: choco fails abnormally on windows
    if (process.platform !== "win32") {
      const installInfo = await setupCppcheck({
        version: getVersion("cppcheck", undefined),
      })

      await testBin("cppcheck", ["--version"], installInfo.binDir)
    }
  })
})
