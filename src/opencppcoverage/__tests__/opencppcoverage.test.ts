import { setupOpencppcoverage } from "../opencppcoverage"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(200000)
describe("setup-OpenCppCoverage", () => {
  it("should setup OpenCppCoverage", async () => {
    if (process.platform !== "win32") {
      return
    }
    await setupOpencppcoverage("", "", "")

    await testBin("OpenCppCoverage")
  })
})
