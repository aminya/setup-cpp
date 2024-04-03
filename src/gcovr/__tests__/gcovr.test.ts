import { ubuntuVersion } from "../../utils/env/ubuntu_version"
import { testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../versions/versions"
import { setupGcovr } from "../gcovr"

jest.setTimeout(300000)
describe("setup-gcovr", () => {
  it("should setup gcovr", async () => {
    const installInfo = await setupGcovr(getVersion("gcovr", "true", await ubuntuVersion()), "", process.arch)
    await testBin("gcovr", ["--version"], installInfo.binDir)
  })
})
