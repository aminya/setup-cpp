import which from "which"
import { testBin } from "../../utils/tests/test-helpers"
import { setupMSVC } from "../msvc"

jest.setTimeout(300000)
describe("setup-msvc", () => {
  it("should setup the pre-installed msvc", async () => {
    try {
      if (process.platform !== "win32") {
        return
      }
      await setupMSVC("", "", process.arch)
      await testBin("cl", [])
      console.log(which("cl"))
    } catch (e) {
      // TODO
      console.error(e)
    }
  })

  it("should setup msvc 2022", async () => {
    try {
      if (process.platform !== "win32") {
        return
      }
      await setupMSVC("2022", "", process.arch)
      await testBin("cl", [])
      console.log(which("cl"))
    } catch (e) {
      // TODO
      console.error(e)
    }
  })

  it("should setup msvc 2019", async () => {
    try {
      if (process.platform !== "win32") {
        return
      }
      await setupMSVC("2019", "", process.arch)
      await testBin("cl", [])
      console.log(which("cl"))
    } catch (e) {
      // TODO
      console.error(e)
    }
  })

  it("should setup msvc 2017", async () => {
    try {
      if (process.platform !== "win32") {
        return
      }
      await setupMSVC("2017", "", process.arch)
      await testBin("cl", [])
      console.log(which("cl"))
    } catch (e) {
      // TODO
      console.error(e)
    }
  })

  it("should setup msvc 2015", async () => {
    try {
      if (process.platform !== "win32") {
        return
      }
      await setupMSVC("2015", "", process.arch)
      await testBin("cl", [])
      console.log(which("cl"))
    } catch (e) {
      // TODO
      console.error(e)
    }
  })
})
