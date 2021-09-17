import { setupMeson } from "../meson"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(300000)
describe("setup-meson", () => {
  it("should setup meson", async () => {
    const installInfo = await setupMeson("", "", process.arch)

    await testBin("meson", ["--version"], installInfo.binDir)
  })
})
