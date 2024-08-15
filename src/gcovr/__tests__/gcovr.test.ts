import { ubuntuVersion } from "../../utils/env/ubuntu_version.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupGcovr } from "../gcovr.js"

jest.setTimeout(300000)
describe("setup-gcovr", () => {
  it("should setup gcovr", async () => {
    const installInfo = await setupGcovr(getVersion("gcovr", "true", await ubuntuVersion()), "", process.arch)
    await testBin("gcovr", ["--version"], installInfo.binDir)
  })
})
