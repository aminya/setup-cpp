import { testBin } from "../../utils/tests/test-helpers.js"
import { setupOpencppcoverage } from "../opencppcoverage.js"

jest.setTimeout(300000)
describe("setup-OpenCppCoverage", () => {
  if (process.platform !== "win32") {
    it.skip("should setup OpenCppCoverage", () => {})
    return
  }
  it("should setup OpenCppCoverage", async () => {
    const installationInfo = await setupOpencppcoverage()

    await testBin("OpenCppCoverage", null, installationInfo?.binDir) // OpenCppCoverage exits with non-zero even with --help
  })
})
