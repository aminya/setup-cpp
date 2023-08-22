import { setupCppcheck } from "../cppcheck"
import { testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../versions/versions"

jest.setTimeout(300000)
describe("setup-cppcheck", () => {
  it("should setup cppcheck", async () => {
    try {
      const installInfo = await setupCppcheck(getVersion("cppcheck", undefined), "", process.arch)

      await testBin("cppcheck", ["--version"], installInfo.binDir)
    } catch (error) {
      if (process.platform === "win32") {
        console.error(error)
      } else {
        throw error
      }
    }
  })
})
