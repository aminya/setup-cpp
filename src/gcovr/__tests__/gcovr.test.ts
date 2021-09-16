import { setupGcovr } from "../gcovr"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(200000)
describe("setup-gcovr", () => {
  it("should setup gcovr", async () => {
    const installInfo = await setupGcovr("", "", process.arch)
    await testBin("gcovr", ["--version"], installInfo.binDir)
  })
})
