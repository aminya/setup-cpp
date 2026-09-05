import { hasDnf, setupDnfPack } from "../src/index.js"

describe("setup-dnf", () => {
  it("exports the dnf setup API", () => {
    expect(setupDnfPack).toBeInstanceOf(Function)
    expect(hasDnf).toBeInstanceOf(Function)
  })

  it("detects dnf on the current host", () => {
    expect(typeof hasDnf()).toBe("boolean")
  })
})
