import { setupConan } from "../conan"
import { spawnSync as spawn } from "child_process"

jest.setTimeout(200000)
describe("setup-conan", () => {
  it("should setup conan", async () => {
    await setupConan("1.40.1")

    const { status } = spawn("conan", ["--version"], {
      encoding: "utf8",
    })
    expect(status).toBe(0)
  })
})
