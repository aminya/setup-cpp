import { ubuntuVersion } from "../../utils/env/ubuntu_version.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupFlawfinder } from "../flawfinder.js"

jest.setTimeout(300000)
describe("setup-flawfinder", () => {
  it("should setup flawfinder", async () => {
    const installInfo = await setupFlawfinder(getVersion("flawfinder", "true", await ubuntuVersion()), "", process.arch)
    await testBin("flawfinder", ["--version"], installInfo.binDir)
  })
})
