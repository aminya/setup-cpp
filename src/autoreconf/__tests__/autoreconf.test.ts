import type { InstallationInfo } from "../../utils/setup/setupBin.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupAutoreconf } from "../autoreconf.js"

jest.setTimeout(300000)

const unixDescribe = process.platform === "win32" ? describe.skip : describe

unixDescribe("setup-autoreconf", () => {
  it("should setup autoreconf", async () => {
    const installInfo = await setupAutoreconf()
    const binDir = (installInfo as InstallationInfo | undefined)?.binDir

    await testBin("autoreconf", ["--version"])
    await testBin("automake", ["--version"])
    await testBin("libtoolize", ["--version"], binDir)
  })
})
