import { ubuntuVersion } from "../../utils/env/ubuntu_version.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupMeson } from "../meson.js"

jest.setTimeout(300000)
describe("setup-meson", () => {
  it("should setup meson", async () => {
    const installInfo = await setupMeson({
      version: getVersion("meson", "true", await ubuntuVersion()),
      setupDir: "",
      arch: process.arch,
    })

    await testBin("meson", ["--version"], installInfo.binDir)
  })
})
