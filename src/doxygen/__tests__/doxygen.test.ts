import { setupDoxygen } from "../doxygen"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(200000)
describe("setup-doxygen", () => {
  it("should setup doxygen", async () => {
    await setupDoxygen("", "", "")

    await testBin("doxygen")
  })
})
