import { setupSevenZip } from "../sevenzip"
import { testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"

jest.setTimeout(300000)
describe("setup-7z", () => {
  it("should setup 7z", async () => {
    const installInfo = await setupSevenZip("", "", process.arch)

    await testBin("7z", ["--help"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
