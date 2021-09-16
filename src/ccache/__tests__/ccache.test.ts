import { setupCcache } from "../ccache"
import { spawnSync as spawn } from "child_process"

jest.setTimeout(200000)
describe("setup-ccache", () => {
  it("should setup ccache", async () => {
    await setupCcache("", "", "")

    const { status } = spawn("ccache", ["--version"], {
      encoding: "utf8",
    })
    expect(status).toBe(0)
  })
})
