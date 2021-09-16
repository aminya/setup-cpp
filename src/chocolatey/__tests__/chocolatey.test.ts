import { testBin } from "../../utils/tests/test-helpers"
import { setupChocolatey } from "../chocolatey"

jest.setTimeout(200000)
describe("setup-chocolatey", () => {
  it("should setup chocolatey", async () => {
    if (process.platform !== "win32") {
      return
    }
    await setupChocolatey("", "", "")
    await testBin("choco")
  })
})
