import { setupNala } from "../nala"
import { testBin } from "../../utils/tests/test-helpers"
import { isUbuntu } from "../../utils/env/isUbuntu"

jest.setTimeout(300000)
describe("setup-nala", () => {
  if (!isUbuntu()) {
    test.skip("should setup nala", () => {})
    return
  }
  it("should setup nala", async () => {
    const installInfo = await setupNala("", "", process.arch)
    await testBin("nala", ["--version"], installInfo?.binDir)
  })
})
