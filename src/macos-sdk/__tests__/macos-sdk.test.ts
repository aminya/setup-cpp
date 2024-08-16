import { setupMacOSSDK } from "../macos-sdk.js"

jest.setTimeout(300000)
describe("setup-macos-sdk", () => {
  if (process.platform !== "darwin") {
    it.skip("should setup macos-sdk", () => {})
    return
  }
  it("should setup macos-sdk", async () => {
    process.env.SDKROOT = undefined
    await setupMacOSSDK()
    expect(process.env.SDKROOT).toBeTruthy()
    expect(typeof process.env.SDKROOT).toBe("string")
  })
})
