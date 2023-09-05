import which from "which"
import { setupMSVC } from "../msvc"
import { runnerWindowsVersion } from "../../utils/tests/test-helpers"
import { warning } from "ci-log"

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
      if ("toString" in (err as any)) {
        warning((err as any).toString())
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
        if ("toString" in (err as any)) {
          warning((err as any).toString())
        }
      }
    })
  }
})
