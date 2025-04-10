import { ubuntuVersion } from "../../utils/env/ubuntu_version.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupLizard } from "../lizard.js"

jest.setTimeout(300000)
describe("setup-lizard", () => {
  it("should setup lizard", async () => {
    const installInfo = await setupLizard({
      version: getVersion("lizard", "true", await ubuntuVersion()),
      setupDir: "",
      arch: process.arch,
    })
    await testBin("lizard", ["--version"], installInfo.binDir)
  })
})
