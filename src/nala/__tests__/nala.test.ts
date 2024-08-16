import { execRootSync } from "admina"
import { isUbuntu } from "../../utils/env/isUbuntu.js"
import { testBin } from "../../utils/tests/test-helpers.js"
import { setupNala } from "../nala.js"

jest.setTimeout(300000)
describe("setup-nala", () => {
  if (!isUbuntu()) {
    test.skip("should setup nala", () => {})
    return
  }
  it("should setup nala", async () => {
    const installInfo = await setupNala("", "", process.arch)
    await testBin("nala", ["--version"], installInfo?.binDir)
  })

  afterAll(() => {
    // remove nala to run the rest of the tests with apt-get
    execRootSync("apt-get", ["remove", "-y", "nala"])

    try {
      execRootSync("apt-get", ["remove", "-y", "nala-legacy"])
    } catch (err) {
      // ignore
      console.error(err)
    }
  })
})
