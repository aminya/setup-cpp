import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupBazel } from "../bazel.js"

jest.setTimeout(300000)
describe("setup-bazel", () => {
  it("should setup bazel", async () => {
    const installInfo = await setupBazel("", "", process.arch)

    await testBin("bazel", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
