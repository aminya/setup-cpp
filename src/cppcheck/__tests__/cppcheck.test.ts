import { setupCppcheck } from "../cppcheck"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(300000)
describe("setup-cppcheck", () => {
  it("should setup cppcheck", async () => {
    const installInfo = await setupCppcheck("", "", process.arch)

    await testBin("cppcheck", ["--version"], installInfo.binDir)
  })
})
