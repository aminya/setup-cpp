import { setupBrew } from "../brew"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(300000)
describe("setup-brew", () => {
  if (process.platform === "win32") {
    it.skip("should setup brew", () => {})
    return
  }
  it("should setup brew", async () => {
    const installInfo = await setupBrew("", "", process.arch)
    await testBin("brew", ["--version"], installInfo?.binDir)
  })
})
