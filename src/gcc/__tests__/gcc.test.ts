import { spawnSync as spawn } from "child_process"
import { setupGcc } from "../gcc"

jest.setTimeout(200000)
describe("setup-gcc", () => {
  it("should setup gcc", async () => {
    await setupGcc("", "", "")

    const { status } = spawn("gcc", {
      encoding: "utf8",
    })
    expect(status).toBe(0)
  })
})
