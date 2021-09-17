import { setupOpencppcoverage } from "../opencppcoverage"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(300000)
describe("setup-OpenCppCoverage", () => {
  it("should setup OpenCppCoverage", async () => {
    if (process.platform !== "win32") {
      return
    }
    const installationInfo = await setupOpencppcoverage("", "", process.arch)

    await testBin("OpenCppCoverage", null, installationInfo?.binDir) // OpenCppCoverage exits with non-zero even with --help
  })
})
