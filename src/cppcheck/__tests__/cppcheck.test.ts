import { setupCppcheck } from "../cppcheck"
import { testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../versions/versions"

jest.setTimeout(300000)
describe("setup-cppcheck", () => {
  it("should setup cppcheck", async () => {
    const installInfo = await setupCppcheck(getVersion("cppcheck", undefined), "", process.arch)

    await testBin("cppcheck", ["--version"], installInfo.binDir)
  })
})
