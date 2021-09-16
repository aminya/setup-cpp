import { setupCcache } from "../ccache"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(200000)
describe("setup-ccache", () => {
  it("should setup ccache", async () => {
    await setupCcache("", "", "")

    await testBin("ccache")
  })
})
