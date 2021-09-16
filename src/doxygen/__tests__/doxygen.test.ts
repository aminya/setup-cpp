import { setupDoxygen } from "../doxygen"
import { spawnSync as spawn } from "child_process"

jest.setTimeout(200000)
describe("setup-doxygen", () => {
  it("should setup doxygen", async () => {
    await setupDoxygen("", "", "")

    const { status } = spawn("doxygen", ["--version"], {
      encoding: "utf8",
    })
    expect(status).toBe(0)
  })
})
