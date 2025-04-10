import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupGit } from "../git.js"

jest.setTimeout(300000)
describe("setup-git", () => {
  it("should setup git", async () => {
    const installInfo = await setupGit({ version: "", setupDir: "", arch: process.arch })

    await testBin("git", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
