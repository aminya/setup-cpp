import { setupBazel } from "../bazel"
import { testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"

jest.setTimeout(300000)
describe("setup-bazel", () => {
  it("should setup bazel", async () => {
    const installInfo = await setupBazel("", "", process.arch)

    await testBin("bazel", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
