import { ubuntuVersion } from "../../utils/env/ubuntu_version.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupCmakelang } from "../cmakelang.js"

jest.setTimeout(300000)
describe("setup-cmakelang", () => {
  it("should setup cmakelang", async () => {
    const installInfo = await setupCmakelang(getVersion("cmakelang", "true", await ubuntuVersion()), "", process.arch)
    await testBin("cmake-lint", ["--version"], installInfo.binDir)
    await testBin("cmake-format", ["--version"], installInfo.binDir)
  })
})
