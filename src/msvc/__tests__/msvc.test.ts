import { setupMSVC } from "../msvc"
import { spawnSync as spawn } from "child_process"

jest.setTimeout(200000)
describe("setup-msvc", () => {
  it("should setup msvc", async () => {
    if (process.platform !== "win32") {
      return
    }
    await setupMSVC("2019", "", "")

    spawn("cl", {
      encoding: "utf8",
    })
    // TODO see #1
    // expect(status).toBe(0)
  })
})
