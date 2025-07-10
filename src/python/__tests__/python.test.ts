import ciInfo from "ci-info"
const { GITHUB_ACTIONS } = ciInfo
import { info } from "ci-log"
import { ubuntuVersion } from "../../utils/env/ubuntu_version.js"
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupPython } from "../python.js"

jest.setTimeout(300000)
describe("setup-python", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("python")
  })

  it("should setup python in GitHub Actions", async () => {
    if (GITHUB_ACTIONS) {
      info("Installing python in GitHub Actions")
      const { setupActionsPython } = await import("../actions_python.js")
      await setupActionsPython(getVersion("python", "true", await ubuntuVersion()), directory, process.arch)

      await testBin("python", ["--version"])
    }
  })

  it("should setup python via system", async () => {
    process.env.CI = "false"
    process.env.GITHUB_ACTIONS = "false"

    const installInfo = await setupPython({
      version: getVersion("python", "true", await ubuntuVersion()),
      setupDir: directory,
      arch: process.arch,
    })

    const python = process.platform === "darwin" ? "python3" : "python"
    await testBin(python, ["--version"], installInfo.binDir)
  })

  afterAll(async () => {
    await cleanupTmpDir("python")
  }, 100000)
})
