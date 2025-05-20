import { hasAptGet, setupAptFast } from "../src/index.js"
import { testBin } from "./testBin.js"

jest.setTimeout(300000)
describe("setup-apt-fast", () => {
  if (!hasAptGet()) {
    test.skip("should setup apt-fast", () => {})
    return
  }
  it("should setup apt-fast", async () => {
    const installInfo = await setupAptFast()
    await testBin("apt-fast", null, installInfo?.binDir)
  })
})
