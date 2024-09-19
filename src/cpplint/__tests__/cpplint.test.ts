import { ubuntuVersion } from "../../utils/env/ubuntu_version.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupCpplint } from "../cpplint.js"

jest.setTimeout(300000)
describe("setup-cpplint", () => {
  it("should setup cpplint", async () => {
    const installInfo = await setupCpplint(getVersion("cpplint", "true", await ubuntuVersion()), "", process.arch)
    await testBin("cpplint", ["--version"], installInfo.binDir)
  })
})
