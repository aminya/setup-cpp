import { setupBrew } from "../brew"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(200000)
describe("setup-brew", () => {
  it("should setup brew", async () => {
    if (process.platform !== "darwin") {
      return
    }
    setupBrew("", "", "")
    await testBin("brew")
  })
})
