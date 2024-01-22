import { setupPython } from "../python"
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { getVersion } from "../../versions/versions"
import { ubuntuVersion } from "../../utils/env/ubuntu_version"
import { GITHUB_ACTIONS } from "ci-info"
import { info } from "ci-log"

jest.setTimeout(300000)
describe("setup-python", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("python")
  })

  it("should setup python in GitHub Actions", async () => {
    if (GITHUB_ACTIONS) {
      info("Installing python in GitHub Actions")
      const { setupActionsPython } = await import("../actions_python")
      await setupActionsPython(getVersion("python", "true", await ubuntuVersion()), directory, process.arch)

      await testBin("python", ["--version"])
    }
  })

  it("should setup python via system", async () => {
    process.env.CI = "false"
    process.env.GITHUB_ACTIONS = "false"

    const installInfo = await setupPython(getVersion("python", "true", await ubuntuVersion()), directory, process.arch)

    await testBin("python", ["--version"], installInfo.binDir)
  })

  afterAll(async () => {
    await cleanupTmpDir("python")
  }, 100000)
})
