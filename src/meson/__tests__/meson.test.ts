import { ubuntuVersion } from "../../utils/env/ubuntu_version"
import { testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../versions/versions"
import { setupMeson } from "../meson"

jest.setTimeout(300000)
describe("setup-meson", () => {
  it("should setup meson", async () => {
    const installInfo = await setupMeson(getVersion("meson", "true", await ubuntuVersion()), "", process.arch)

    await testBin("meson", ["--version"], installInfo.binDir)
  })
})
