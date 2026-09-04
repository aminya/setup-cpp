import { setupChocoPack } from "../src/index.js"

describe("setup-choco", () => {
  it("exports the Chocolatey package installer", () => {
    expect(setupChocoPack).toBeInstanceOf(Function)
  })
})
