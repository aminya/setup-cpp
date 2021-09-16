import { setupOpencppcoverage } from "../opencppcoverage"
import { spawnSync as spawn } from "child_process"

jest.setTimeout(200000)
describe("setup-OpenCppCoverage", () => {
  it("should setup OpenCppCoverage", async () => {
    if (process.platform !== "win32") {
      return
    }
    await setupOpencppcoverage()

    const { status } = spawn("OpenCppCoverage", ["--version"], {
      encoding: "utf8",
    })
    expect(status).toBe(0)
  })
})
