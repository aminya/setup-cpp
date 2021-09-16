import { setupBrew } from "../brew"
import { spawnSync as spawn } from "child_process"

jest.setTimeout(200000)
describe("setup-brew", () => {
  it("should setup brew", async () => {
    if (process.platform !== "darwin") {
      return
    }
    await setupBrew("", "", "")

    const { status } = spawn("brew", ["--version"], {
      encoding: "utf8",
    })
    expect(status).toBe(0)
  })
})
