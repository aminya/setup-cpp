import { macosVersion } from "../../utils/env/macos_version.js"
import { ubuntuVersion } from "../../utils/env/ubuntu_version.js"
import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { cleanupTmpDir, testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupGraphviz } from "../graphviz.js"

jest.setTimeout(300000)
describe("setup-graphviz", () => {
  if (process.platform === "darwin" && macosVersion()[0] <= 11) {
    test.skip("Skipping graphviz test on macOS 11 or earlier", () => {})
    return
  }

  it("should setup graphviz", async () => {
    const installInfo = await setupGraphviz({
      version: getVersion("graphviz", undefined, await ubuntuVersion()),
    })

    await testBin("dot", ["-V"], (installInfo as InstallationInfo | undefined)?.binDir)
  })

  afterAll(async () => {
    await cleanupTmpDir("graphviz")
  }, 100000)
})
