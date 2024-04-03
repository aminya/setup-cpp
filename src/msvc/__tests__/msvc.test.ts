import { warning } from "ci-log"
import which from "which"
import { runnerWindowsVersion } from "../../utils/tests/test-helpers"
import { setupMSVC } from "../msvc"

jest.setTimeout(300000)
describe("setup-msvc", () => {
  if (process.platform !== "win32") {
    it.skip("should setup msvc", () => {})
    return
  }
  it("should setup the pre-installed msvc", async () => {
    try {
      await setupMSVC("", "", process.arch)
      console.log(which.sync("cl"))
    } catch (err) {
      if (err instanceof Error) {
        warning(err.toString())
      }
    }
  })

  for (const version of [2022, 2019, 2017, 2015]) {
    if (runnerWindowsVersion() !== undefined && runnerWindowsVersion()! > version) {
      it.skip(`should setup msvc ${version}`, () => {})
      return
    }
    it(`should setup msvc ${version}`, async () => {
      try {
        await setupMSVC(`${version}`, "", process.arch)
        console.log(which.sync("cl"))
      } catch (err) {
        if (err instanceof Error) {
          warning(err.toString())
        }
      }
    })
  }
})
