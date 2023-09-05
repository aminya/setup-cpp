import { setupNala } from "../nala"
import { testBin } from "../../utils/tests/test-helpers"
import { isUbuntu } from "../../utils/env/isUbuntu"
import { execRootSync } from "admina"

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
    execRootSync("apt-get", ["remove", "-y", "nala-legacy"])
  })
})
