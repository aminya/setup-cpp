import { setupGraphviz } from "../graphviz"
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"
import { getVersion } from "../../versions/versions"
import { ubuntuVersion } from "../../utils/env/ubuntu_version"
import { macosVersion } from "../../utils/env/macos_version"

jest.setTimeout(300000)
describe("setup-graphviz", () => {
  if (process.platform === "darwin" && macosVersion()[0] <= 11) {
    test.skip("Skipping graphviz test on macOS 11 or earlier", () => {})
    return
  }

  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("graphviz")
  })

  it("should setup graphviz", async () => {
    const installInfo = await setupGraphviz(
      getVersion("graphviz", undefined, await ubuntuVersion()),
      directory,
      process.arch,
    )

    await testBin("dot", ["-V"], (installInfo as InstallationInfo | undefined)?.binDir)
  })

  afterAll(async () => {
    await cleanupTmpDir("graphviz")
  }, 100000)
})
