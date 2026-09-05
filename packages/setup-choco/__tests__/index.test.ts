import which from "which"
import { setupChocoPack } from "../src/index.js"

const testWithInstalledChocolatey = process.platform === "win32" && which.sync("choco", { nothrow: true }) !== null
  ? it
  : it.skip

describe("setup-choco", () => {
  it("exports the Chocolatey package installer", () => {
    expect(setupChocoPack).toBeInstanceOf(Function)
  })

  testWithInstalledChocolatey("accepts an installed choco without a bootstrap callback", async () => {
    const result = await setupChocoPack("chocolatey", undefined, ["--noop"])

    expect(result.binDir).toBe(`${process.env.ChocolateyInstall ?? "C:/ProgramData/chocolatey"}/bin`)
  })
})
