import { execRootSync } from "admina"
import { hasAptGet } from "../../utils/env/hasAptGet.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupAptFast } from "../apt-fast.js"

jest.setTimeout(300000)
describe("setup-apt-fast", () => {
  if (!hasAptGet()) {
    test.skip("should setup apt-fast", () => {})
    return
  }
  it("should setup apt-fast", async () => {
    const installInfo = await setupAptFast("", "", process.arch)
    await testBin("apt-fast", ["--version"], installInfo?.binDir)
  })

  afterAll(() => {
    // remove apt-fast to run the rest of the tests with apt-get
    execRootSync("apt-get", ["remove", "-y", "apt-fast"])
  })
})
