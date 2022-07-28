import { setupNala } from "../nala"
import { testBin } from "../../utils/tests/test-helpers"
import { isUbuntu } from "../../utils/env/isUbuntu"

jest.setTimeout(300000)
describe("setup-nala", () => {
  it("should setup nala", async () => {
    if (!isUbuntu()) {
      return
    }
    const installInfo = await setupNala("", "", process.arch)
    await testBin("nala", ["--version"], installInfo?.binDir)
  })
})
