import { testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupConan } from "../conan.js"

jest.setTimeout(300000)
describe("setup-conan", () => {
  it("should setup conan", async () => {
    const installInfo = await setupConan(getVersion("conan", "true"), "", process.arch)

    await testBin("conan", ["--version"], installInfo.binDir)
  })
})
