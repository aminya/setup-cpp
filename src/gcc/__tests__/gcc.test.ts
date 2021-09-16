import { testBin } from "../../utils/tests/test-helpers"
import { setupGcc } from "../gcc"

jest.setTimeout(200000)
describe("setup-gcc", () => {
  it("should setup gcc", async () => {
    const installInfo = await setupGcc("11", "", "")

    await testBin("g++", ["--version"], installInfo?.binDir)
  })
})
