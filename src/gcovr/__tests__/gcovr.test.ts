import { setupGcovr } from "../gcovr"
import { testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../default_versions"

jest.setTimeout(300000)
describe("setup-gcovr", () => {
  it("should setup gcovr", async () => {
    const installInfo = await setupGcovr(getVersion("gcovr", "true"), "", process.arch)
    await testBin("gcovr", ["--version"], installInfo.binDir)
  })
})
