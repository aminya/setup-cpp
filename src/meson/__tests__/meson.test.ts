import { setupMeson } from "../meson"
import { testBin } from "../../utils/tests/test-helpers"

jest.setTimeout(200000)
describe("setup-meson", () => {
  it("should setup meson", async () => {
    await setupMeson("0.59.1", "", "")
    await testBin("meson")
  })
})
