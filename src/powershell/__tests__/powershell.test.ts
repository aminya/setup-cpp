import { GITHUB_ACTIONS } from "ci-info"
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers.js"
import { getVersion } from "../../versions/versions.js"
import { setupPowershell } from "../powershell.js"

jest.setTimeout(300000)
describe("setup-powershell", () => {
  let directory: string
  beforeEach(async () => {
    directory = await setupTmpDir("powershell")
    process.env.CACHE_TOOLS = "true"
  })

  it("should setup powershell", async () => {
    if (process.platform === "win32" && GITHUB_ACTIONS) {
      // results in errors
      return
    }

    const installInfo = await setupPowershell(getVersion("powershell", undefined), directory, process.arch)

    await testBin("pwsh", ["--version"], installInfo.binDir)
  })

  afterEach(async () => {
    await cleanupTmpDir("ninja")
  }, 100000)
})
