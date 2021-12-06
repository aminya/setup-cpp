import which from "which"
import { testBin } from "../../utils/tests/test-helpers"
import { setupMSVC } from "../msvc"

const initial_env = { ...process.env }

jest.setTimeout(300000)
describe("setup-msvc", () => {
  beforeEach(() => {
    process.env = initial_env
  })

  it("should setup msvc 2019", async () => {
    if (process.platform !== "win32") {
      return
    }
    await setupMSVC("2019", "", process.arch)
    await testBin("cl", [])
    console.log(which("cl"))
  })

  it("should setup msvc 2017", async () => {
    if (process.platform !== "win32") {
      return
    }
    await setupMSVC("2017", "", process.arch)
    await testBin("cl", [])
    console.log(which("cl"))
  })

  it("should setup msvc 2015", async () => {
    if (process.platform !== "win32") {
      return
    }
    await setupMSVC("2015", "", process.arch)
    await testBin("cl", [])
    console.log(which("cl"))
  })
})
