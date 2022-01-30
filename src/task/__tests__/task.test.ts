import { setupTask } from "../task"
import { setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"

jest.setTimeout(300000)
describe("setup-task", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("task")
  })

  it("should setup task", async () => {
    const installInfo = await setupTask("3.10.0", directory, process.arch)

    await testBin("task", ["--version"], (installInfo as InstallationInfo | undefined)?.binDir)
  })
})
