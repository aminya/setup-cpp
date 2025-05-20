import { execRootSync } from "admina"
import { hasAptGet } from "../src/get-apt.js"
import { setupNala } from "../src/nala.js"
import { testBin } from "./testBin.js"

jest.setTimeout(300000)
describe("setup-nala", () => {
  if (!hasAptGet()) {
    test.skip("should setup nala", () => {})
    return
  }
  it("should setup nala", async () => {
    const installInfo = await setupNala()
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
