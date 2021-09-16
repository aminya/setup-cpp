import { setupCppcheck } from "../cppcheck"
import { spawnSync as spawn } from "child_process"

jest.setTimeout(200000)
describe("setup-cppcheck", () => {
  it("should setup cppcheck", async () => {
    await setupCppcheck("", "", "")

    const { status } = spawn("cppcheck", ["--version"], {
      encoding: "utf8",
    })
    expect(status).toBe(0)
  })
})
