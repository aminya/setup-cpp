import { setupPython } from "../python"
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../default_versions"
import { ubuntuVersion } from "../../utils/env/ubuntu_version"
import { isGitHubCI } from "../../utils/env/isci"

jest.setTimeout(300000)
describe("setup-python", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("python")
  })

  it("should setup python in GitHub Actions", async () => {
    if (isGitHubCI()) {
      const installInfo = await setupPython(
        getVersion("python", "true", await ubuntuVersion()),
        directory,
        process.arch
      )

      await testBin("python", ["--version"], installInfo?.binDir)
    }
  })

  it("should setup python via system", async () => {
    process.env.CI = "false"

    const installInfo = await setupPython(getVersion("python", "true", await ubuntuVersion()), directory, process.arch)

    await testBin("python", ["--version"], installInfo?.binDir)
  })

  afterAll(async () => {
    await cleanupTmpDir("python")
  }, 100000)
})
