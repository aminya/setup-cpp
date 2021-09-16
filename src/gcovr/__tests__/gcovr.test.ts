import { setupGcovr } from "../gcovr"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(200000)
describe("setup-gcovr", () => {
  it("should setup gcovr", async () => {
    await setupGcovr("5.0", "", "")

    await testBin("gcovr")
  })
})
