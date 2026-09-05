import { setupDmg } from "../src/index.js"

describe("setup-dmg", () => {
  it("exports the DMG setup API", () => {
    expect(setupDmg).toBeInstanceOf(Function)
  })
})
