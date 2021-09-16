import { setupBrew } from "../brew"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(200000)
describe("setup-brew", () => {
  it("should setup brew", async () => {
    if (process.platform !== "darwin") {
      return
    }
    const installInfo = setupBrew("", "", process.arch)
    await testBin("brew", ["--version"], installInfo?.binDir)
  })
})
