import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupSevenZip } from "../sevenzip.js"

jest.setTimeout(300000)
describe("setup-7z", () => {
  it("should setup 7z", async () => {
    const installInfo = await setupSevenZip({ version: "", setupDir: "", arch: process.arch })

    await testBin("7z", ["--help"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
