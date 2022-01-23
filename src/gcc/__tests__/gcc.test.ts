import { testBin } from "../../utils/tests/test-helpers"
import { setupGcc } from "../gcc"
import { getVersion } from "../../default_versions"

jest.setTimeout(3000000)
describe("setup-gcc", () => {
  it("should setup gcc", async () => {
    const version = getVersion("gcc", undefined) || "11"
    const installInfo = await setupGcc(version, "", process.arch)

    let gpp = "g++"
    if (process.platform !== "win32") {
      gpp = `g++-${version}`
    }
    await testBin(gpp, ["--version"], installInfo?.binDir)
  })
})
