import { setupMacOSSDK } from "../macos-sdk"

jest.setTimeout(300000)
describe("setup-macos-sdk", () => {
  it("should setup macos-sdk", async () => {
    if (process.platform === "darwin") {
      process.env.SDKROOT = undefined
      await setupMacOSSDK()
      expect(process.env.SDKROOT).toBeTruthy()
      expect(typeof process.env.SDKROOT).toBe("string")
    }
  })
})
