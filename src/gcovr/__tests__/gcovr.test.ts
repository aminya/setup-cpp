import { setupGcovr } from "../gcovr"
import { spawnSync as spawn } from "child_process"

jest.setTimeout(100000)

describe("setup-gcovr", () => {
  it("should setup gcovr", async () => {
    await setupGcovr("5.0")

    const { status } = spawn("gcovr", ["--version"], {
      encoding: "utf8",
    })
    expect(status).toBe(0)
  })
})
