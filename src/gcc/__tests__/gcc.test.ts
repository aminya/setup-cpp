import { testBin } from "../../utils/tests/test-helpers"
import { setupGcc } from "../gcc"

jest.setTimeout(200000)
describe("setup-gcc", () => {
  it("should setup gcc", async () => {
    const installInfo = await setupGcc("11", "", process.arch)

    let gpp = "g++"
    if (process.platform !== "win32") {
      gpp = "g++-11"
    }
    await testBin(gpp, ["--version"], installInfo?.binDir)
  })
})
