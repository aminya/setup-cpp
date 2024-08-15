import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupMake } from "../make.js"

jest.setTimeout(300000)
describe("setup-make", () => {
  it("should setup make", async () => {
    const installInfo = await setupMake("", "", process.arch)

    await testBin("make", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
