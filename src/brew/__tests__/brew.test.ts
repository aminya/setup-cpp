import { setupBrew } from "../brew"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(300000)
describe("setup-brew", () => {
  it("should setup brew", async () => {
    if (process.platform !== "darwin") {
      return
    }
    const installInfo = await setupBrew("", "", process.arch)
    await testBin("brew", ["--version"], installInfo?.binDir)
  })
})
