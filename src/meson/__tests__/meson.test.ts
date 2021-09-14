import { setupMeson } from "../meson"
import { spawnSync as spawn } from "child_process"

jest.setTimeout(100000)

describe("setup-meson", () => {
  it("should setup meson", async () => {
    await setupMeson("0.59.1")

    const { status } = spawn("meson", ["--version"], {
      encoding: "utf8",
    })
    expect(status).toBe(0)
  })
})
