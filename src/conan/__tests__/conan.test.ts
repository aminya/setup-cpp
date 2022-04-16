import { setupConan } from "../conan"
import { testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../default_versions"

jest.setTimeout(300000)
describe("setup-conan", () => {
  it("should setup conan", async () => {
    const installInfo = await setupConan(getVersion("conan", "true"), "", process.arch)

    await testBin("conan", ["--version"], installInfo.binDir)
  })
})
