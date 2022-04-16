import { setupMeson } from "../meson"
import { testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../default_versions"

jest.setTimeout(300000)
describe("setup-meson", () => {
  it("should setup meson", async () => {
    const installInfo = await setupMeson(getVersion("meson", "true"), "", process.arch)

    await testBin("meson", ["--version"], installInfo.binDir)
  })
})
