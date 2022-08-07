import { setupPowershell } from "../powershell"
import { testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../default_versions"

jest.setTimeout(300000)
describe("setup-powershell", () => {
  it("should setup powershell", async () => {
    const installInfo = await setupPowershell(getVersion("powershell", undefined), "", process.arch)

    await testBin("pwsh", ["--version"], installInfo.binDir)
  })
})
