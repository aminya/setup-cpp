import { setupCppcheck } from "../cppcheck"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(200000)
describe("setup-cppcheck", () => {
  it("should setup cppcheck", async () => {
    await setupCppcheck("", "", "")

    await testBin("cppcheck")
  })
})
