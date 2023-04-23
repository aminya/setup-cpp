import { setupPowershell } from "../powershell"
import { testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../versions/versions"
import { GITHUB_ACTIONS } from "ci-info"

jest.setTimeout(300000)
describe("setup-powershell", () => {
  it("should setup powershell", async () => {
    if (process.platform === "win32" && GITHUB_ACTIONS) {
      // results in errors
      return
    }

    const installInfo = await setupPowershell(getVersion("powershell", undefined), "", process.arch)

    await testBin("pwsh", ["--version"], installInfo.binDir)
  })
})
