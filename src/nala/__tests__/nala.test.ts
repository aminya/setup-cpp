import { setupNala } from "../nala"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(300000)
describe("setup-nala", () => {
  it("should setup nala", async () => {
    if (process.platform !== "linux") {
      return
    }
    const installInfo = setupNala("", "", process.arch)
    await testBin("nala", ["--version"], installInfo?.binDir)
  })
})
