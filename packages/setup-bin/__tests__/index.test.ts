import { setupBin } from "../src/index.js"

describe("setup-bin", () => {
  it("exports the direct-download installer API", () => {
    expect(setupBin).toBeInstanceOf(Function)
  })
})
