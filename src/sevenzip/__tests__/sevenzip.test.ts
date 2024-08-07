import type { InstallationInfo } from "../../utils/setup/setupBin"
import { testBin } from "../../utils/tests/test-helpers"
import { setupSevenZip } from "../sevenzip"

jest.setTimeout(300000)
describe("setup-7z", () => {
  it("should setup 7z", async () => {
    const installInfo = await setupSevenZip("", "", process.arch)

    await testBin("7z", ["--help"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
