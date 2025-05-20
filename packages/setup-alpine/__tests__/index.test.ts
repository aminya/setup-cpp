import { hasApk, installApkPack } from "../src/index.js"

describe("setup-alpine", () => {
  it("should be a function", () => {
    expect(installApkPack).toBeInstanceOf(Function)
    expect(hasApk).toBeInstanceOf(Function)
  })
})
