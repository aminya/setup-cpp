import { setupConan } from "../conan"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(300000)
describe("setup-conan", () => {
  it("should setup conan", async () => {
    const installInfo = await setupConan("", "", process.arch)

    await testBin("conan", ["--version"], installInfo.binDir)
  })
})
