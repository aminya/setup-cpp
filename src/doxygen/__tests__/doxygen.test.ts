import which from "which"
import { macosVersion } from "../../utils/env/macos_version"
import { ubuntuVersion } from "../../utils/env/ubuntu_version"
import { InstallationInfo } from "../../utils/setup/setupBin"
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../versions/versions"
import { setupDoxygen } from "../doxygen"

jest.setTimeout(300000)
describe("setup-doxygen", () => {
  if (process.platform === "darwin" && macosVersion()[0] <= 11) {
    test.skip("Skipping doxygen test on macOS 11 or earlier", () => {})
    return
  }

  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("doxygen")
  })

  it("should setup doxygen and dot", async () => {
    const installInfo = await setupDoxygen(
      getVersion("doxygen", undefined, await ubuntuVersion()),
      directory,
      process.arch,
    )

    await testBin("doxygen", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)

    expect(which.sync("dot")).toBeDefined()
  })

  afterAll(async () => {
    await cleanupTmpDir("doxygen")
  }, 100000)
})
