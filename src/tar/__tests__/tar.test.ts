import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupTar } from "../tar.js"

jest.setTimeout(300000)
describe("setup-tar", () => {
  it("should setup tar", async () => {
    const installInfo = await setupTar("", "", process.arch)

    await testBin("tar", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
