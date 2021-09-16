import { setupConan } from "../conan"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(200000)
describe("setup-conan", () => {
  it("should setup conan", async () => {
    await setupConan("1.40.1", "", "")

    await testBin("conan")
  })
})
