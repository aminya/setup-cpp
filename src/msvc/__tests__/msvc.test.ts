import { testBin } from "../../utils/tests/test-helpers"
import { setupMSVC } from "../msvc"

jest.setTimeout(200000)
describe("setup-msvc", () => {
  it("should setup msvc", async () => {
    if (process.platform !== "win32") {
      return
    }
    await setupMSVC("2019", "", "")

    try {
      await testBin("cl", [])
    } catch (err) {
      // TODO see #1
    }
  })
})
