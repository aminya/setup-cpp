import { setupChocolatey } from "../chocolatey"
import { spawnSync as spawn } from "child_process"

jest.setTimeout(100000)

describe("setup-chocolatey", () => {
  it("should setup chocolatey", async () => {
    await setupChocolatey()

    const { status } = spawn("choco", ["--version"], {
      encoding: "utf8",
    })
    expect(status).toBe(0)
  })
})
